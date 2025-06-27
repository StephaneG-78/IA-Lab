import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Download, MapPin, Calendar, MessageSquare, HelpCircle } from 'lucide-react';
import { getParticipations } from '@/utils/storage';
import { Participation } from '@/types';

export function ConsultationsList() {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [filter, setFilter] = useState<'all' | 'question' | 'contribution'>('all');

  useEffect(() => {
    const allParticipations = getParticipations()
      .filter(p => p.status === 'publiee')
      .sort((a, b) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime());
    setParticipations(allParticipations);
  }, []);

  const filteredParticipations = participations.filter(p => 
    filter === 'all' || p.type === filter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadPdf = (participation: Participation) => {
    if (participation.fichierPdf && participation.fileName) {
      // In a real app, you'd download from a server
      // For this demo, we'll show a toast
      alert(`Téléchargement de ${participation.fileName}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Consultations Publiques
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Découvrez les questions et contributions de la communauté
          </p>
        </div>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Filtrer par :</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                  className="transition-all duration-300"
                >
                  Toutes ({participations.length})
                </Button>
                <Button
                  variant={filter === 'question' ? 'default' : 'outline'}
                  onClick={() => setFilter('question')}
                  className="transition-all duration-300"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Questions ({participations.filter(p => p.type === 'question').length})
                </Button>
                <Button
                  variant={filter === 'contribution' ? 'default' : 'outline'}
                  onClick={() => setFilter('contribution')}
                  className="transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contributions ({participations.filter(p => p.type === 'contribution').length})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {filteredParticipations.length === 0 ? (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Aucune participation trouvée
                </h3>
                <p className="text-gray-500">
                  {filter === 'all' 
                    ? 'Aucune participation n\'a encore été publiée.'
                    : `Aucune ${filter === 'question' ? 'question' : 'contribution'} n'a été trouvée.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredParticipations.map((participation) => (
              <Card 
                key={participation.id} 
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <Badge 
                      variant={participation.type === 'question' ? 'default' : 'secondary'}
                      className={`${
                        participation.type === 'question' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      } px-3 py-1 text-sm font-medium`}
                    >
                      {participation.type === 'question' ? (
                        <><HelpCircle className="h-3 w-3 mr-1" /> Question</>
                      ) : (
                        <><MessageSquare className="h-3 w-3 mr-1" /> Contribution</>
                      )}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {participation.ville}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(participation.dateCreation)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {participation.titre}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Par {participation.pseudo}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {participation.message}
                    </p>
                  </div>

                  {participation.fileName && (
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadPdf(participation)}
                      className="mb-4 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger {participation.fileName}
                    </Button>
                  )}

                  {participation.reponse && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Réponse officielle
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
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}