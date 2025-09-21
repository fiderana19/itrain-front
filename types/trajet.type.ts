export type SearchTrajetType = {
  depart: string;
  arrive: string;
  date: string;
};

export type CreateTrajetType = {
  date_trajet: string;
  gare_depart: string;
  gare_arrive: string;
  duree_trajet: string;
  heure_depart: string;
  heure_arrive: string;
  billet: string;
  train_id: string;
};

export type EditTrajetType = {
  trajet_id: string;
  date_trajet: string;
  gare_depart: string;
  gare_arrive: string;
  duree_trajet: string;
  heure_depart: string;
  heure_arrive: string;
  billet: string;
  train_id: string;
};
