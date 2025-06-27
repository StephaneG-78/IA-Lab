import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, CheckCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveParticipation } from '@/utils/storage';
import { Participation } from '@/types';

export function ParticipationForm() {
  const [formData, setFormData] = useState({
    pseudo: '',
    ville: '',
    type: '',
    titre: '',
    message: ''
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: 'Erreur',
          description: 'Seuls les fichiers PDF sont autorisés.',
          variant: 'destructive'
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'Erreur',
          description: 'Le fichier ne doit pas dépasser 10 Mo.',
          variant: 'destructive'
        });
        return;
      }
      setPdfFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.pseudo || !formData.ville || !formData.type || !formData.titre || !formData.message) {
      toast({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const participation: Participation = {
        id: crypto.randomUUID(),
        pseudo: formData.pseudo,
        ville: formData.ville,
        type: formData.type as 'question' | 'contribution',
        titre: formData.titre,
        message: formData.message,
        fichierPdf: pdfFile || undefined,
        fileName: pdfFile?.name,
        status: 'en-attente',
        dateCreation: new Date().toISOString()
      };

      saveParticipation(participation);
      setIsSubmitted(true);
      
      toast({
        title: 'Participation envoyée',
        description: 'Votre participation a été soumise avec succès.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'envoi.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="text-center p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                Merci pour votre participation !
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Votre message a été envoyé avec succès. Il sera examiné par nos équipes avant publication.
              </p>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ pseudo: '', ville: '', type: '', titre: '', message: '' });
                setPdfFile(null);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Nouvelle participation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Participez à la concertation
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Partagez vos questions et contributions avec la communauté
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pseudo" className="text-sm font-medium">
                    Pseudo <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pseudo"
                    value={formData.pseudo}
                    onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
                    placeholder="Votre pseudonyme"
                    className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ville" className="text-sm font-medium">
                    Ville <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="ville"
                    value={formData.ville}
                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                    placeholder="Votre ville"
                    className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">
                  Vous souhaitez poster une : <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                    <RadioGroupItem value="question" id="question" />
                    <Label htmlFor="question" className="cursor-pointer flex-1">Question</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                    <RadioGroupItem value="contribution" id="contribution" />
                    <Label htmlFor="contribution" className="cursor-pointer flex-1">Contribution</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="titre" className="text-sm font-medium">
                  Titre de votre message <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="titre"
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                  placeholder="Titre de votre participation"
                  className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium">
                  Votre message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Détaillez votre question ou contribution..."
                  className="mt-1 min-h-32 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="pdf" className="text-sm font-medium">
                  Joindre un fichier PDF (optionnel)
                </Label>
                <div className="mt-1">
                  <Input
                    id="pdf"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="pdf"
                    className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    {pdfFile ? (
                      <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                        <FileText className="h-5 w-5" />
                        <span>{pdfFile.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Upload className="h-5 w-5" />
                        <span>Cliquez pour sélectionner un fichier PDF (max 10 Mo)</span>
                      </div>
                    )}
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Valider ma participation'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}