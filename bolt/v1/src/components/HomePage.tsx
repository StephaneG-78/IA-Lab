import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Users, CheckCircle, ArrowRight, HelpCircle, FileText } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              Concertation Publique
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Participez au dialogue citoyen et contribuez aux décisions qui façonnent notre territoire
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => onNavigate('participate')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Participer maintenant
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              onClick={() => onNavigate('consultations')}
              variant="outline"
              className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
            >
              <Users className="h-5 w-5 mr-2" />
              Voir les contributions
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 inline-block">
                    <HelpCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Posez vos questions
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Interrogez les décideurs sur les projets qui vous concernent et obtenez des réponses officielles.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 inline-block">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Partagez vos idées
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Proposez vos contributions et enrichissez les projets de votre expertise citoyenne.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-green-500 to-teal-600 inline-block">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Suivi transparent
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Consultez toutes les participations publiées et suivez les réponses apportées.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Un processus simple et transparent pour faire entendre votre voix
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '1',
                title: 'Participez',
                description: 'Remplissez le formulaire avec votre question ou contribution',
                icon: MessageSquare
              },
              {
                step: '2',
                title: 'Modération',
                description: 'Votre participation est examinée par nos équipes',
                icon: CheckCircle
              },
              {
                step: '3',
                title: 'Publication',
                description: 'Une fois validée, votre participation est publiée',
                icon: Users
              },
              {
                step: '4',
                title: 'Réponse',
                description: 'Recevez une réponse officielle à votre participation',
                icon: ArrowRight
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <item.icon className="h-6 w-6 text-blue-500 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 border-0 shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Votre voix compte !
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Rejoignez la conversation et participez activement à la construction de notre territoire commun.
              </p>
              <Button
                onClick={() => onNavigate('participate')}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Commencer ma participation
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}