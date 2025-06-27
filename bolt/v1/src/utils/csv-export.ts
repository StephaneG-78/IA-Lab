import { Participation } from '@/types';

export const exportToCSV = (participations: Participation[]): void => {
  const headers = [
    'ID',
    'Pseudo',
    'Ville',
    'Type',
    'Titre',
    'Message',
    'Fichier PDF',
    'Statut',
    'Date de création',
    'Réponse',
    'Date de réponse'
  ];

  const csvContent = [
    headers.join(','),
    ...participations.map(p => [
      p.id,
      `"${p.pseudo}"`,
      `"${p.ville}"`,
      p.type,
      `"${p.titre}"`,
      `"${p.message.replace(/"/g, '""')}"`,
      p.fileName || '',
      p.status,
      p.dateCreation,
      p.reponse ? `"${p.reponse.replace(/"/g, '""')}"` : '',
      p.dateReponse || ''
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `participations-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};