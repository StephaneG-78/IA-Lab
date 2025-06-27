import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Trash2, 
  Check, 
  X, 
  Reply, 
  Download, 
  Eye, 
  LogOut,
  Users,
  MessageSquare,
  CheckCircle,
  Clock
} from 'lucide-react';
import { getParticipations, updateParticipation, deleteParticipation } from '@/utils/storage';
import { exportToCSV } from '@/utils/csv-export';
import { Participation } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [replyText, setReplyText] = useState('');
  const [selectedParticipation, setSelectedParticipation] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadParticipations();
  }, []);

  const loadParticipations = () => {
    const data = getParticipations().sort(
      (a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()
    );
    setParticipations(data);
  };

  const handleStatusChange = (id: string, status: 'en-attente' | 'publiee') => {
    updateParticipation(id, { status });
    loadParticipations();
    toast({
      title: 'Statut mis à jour',
      description: `La participation a été ${status === 'publiee' ? 'publiée' : 'mise en attente'}.`,
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette participation ?')) {
      deleteParticipation(id);
      loadParticipations();
      toast({
        title: 'Participation supprimée',
        description: 'La participation a été supprimée avec succès.',
      });
    }
  };

  const handleReply = (id: string) => {
    if (!replyText.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez saisir une réponse.',
        variant: 'destructive'
      });
      return;
    }

    updateParticipation(id, {
      reponse: replyText,
      dateReponse: new Date().toISOString()
    });
    
    setReplyText('');
    setSelectedParticipation(null);
    loadParticipations();
    
    toast({
      title: 'Réponse ajoutée',
      description: 'Votre réponse a été ajoutée à la participation.',
    });
  };

  const handleExport = () => {
    exportToCSV(participations);
    toast({
      title: 'Export réussi',
      description: 'Le fichier CSV a été téléchargé.',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: participations.length,
    published: participations.filter(p => p.status === 'publiee').length,
    pending: participations.filter(p => p.status === 'en-attente').length,
    questions: participations.filter(p => p.type === 'question').length,
    contributions: participations.filter(p => p.type === 'contribution').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tableau de bord
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Gérez les participations à la concertation publique
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={handleExport} variant="outline" className="hover:bg-green-50">
              <Download className="h-4 w-4 mr-2" />
              Exporter CSV
            </Button>
            <Button onClick={onLogout} variant="outline" className="hover:bg-red-50">
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{stats.published}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Publiées</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">En attente</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{stats.questions}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Questions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{stats.contributions}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Contributions</p>
            </CardContent>
          </Card>
        </div>

        {/* Participations List */}
        <div className="space-y-4">
          {participations.length === 0 ? (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Aucune participation
                </h3>
                <p className="text-gray-500">
                  Aucune participation n'a encore été soumise.
                </p>
              </CardContent>
            </Card>
          ) : (
            participations.map((participation) => (
              <Card 
                key={participation.id} 
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant={participation.type === 'question' ? 'default' : 'secondary'}
                        className={participation.type === 'question' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }
                      >
                        {participation.type}
                      </Badge>
                      <Badge 
                        variant={participation.status === 'publiee' ? 'default' : 'secondary'}
                        className={participation.status === 'publiee' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        }
                      >
                        {participation.status === 'publiee' ? 'Publiée' : 'En attente'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(participation.id, participation.status === 'publiee' ? 'en-attente' : 'publiee')}
                        className="hover:bg-green-50"
                      >
                        {participation.status === 'publiee' ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedParticipation(participation.id)}
                            className="hover:bg-blue-50"
                          >
                            <Reply className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Répondre à la participation</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <h4 className="font-semibold mb-2">{participation.titre}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {participation.message}
                              </p>
                            </div>
                            <Textarea
                              placeholder="Votre réponse..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="min-h-32"
                            />
                            <Button
                              onClick={() => handleReply(participation.id)}
                              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                            >
                              Envoyer la réponse
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(participation.id)}
                        className="hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {participation.titre}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Par {participation.pseudo} • {participation.ville} • {formatDate(participation.dateCreation)}
                      </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {participation.message}
                    </p>
                    {participation.fileName && (
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        📎 Fichier joint: {participation.fileName}
                      </p>
                    )}
                    {participation.reponse && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                          Votre réponse
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {participation.reponse}
                        </p>
                        {participation.dateReponse && (
                          <p className="text-sm text-gray-500 mt-2">
                            Répondu le {formatDate(participation.dateReponse)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}