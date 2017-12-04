#INF4375 – Paradigmes des échanges Internet
#Projet de session - Automne 2017
#Hicham Laroussi-Hassani
#code permanant :LARH23107103


***

##Projet

Le projet consiste à récupérer un ensemble de données provenant de la ville de Montréal et d'offrir des services à partir de ces données. Il s'agit de données ouvertes à propos d'installations pour faire des activités sportives.

##1-Fonctionnalités réalisées:

  | Fonctionnalité | xp |
  | :------------: |:--:|
  |       A1       | 15 |
  |       A2       | 05 |
  |       A3       | 05 |
  |       A4       | 10 |
  |       A5       | 10 |
  |       A6       | 10 |
  |       C1       | 10 |
  |       C2       | 10 |
  |       C3       | 05 |
  |       F1       | 20 |
  |   **Total**    | 100|
  
#REMARQUE: 

    La base de donnee est insere en miniscule, se qui implique pour la fonctionalite 
    A4 de saisir l'arrondissement en miniscule direct dans l'URL.
    Ex. GET /installations?arrondissement=lasalle
    http://localhost:3000/installations?arrondissement=lasalle
    
    De meme pour obtenir la liste des installations en mauvaise condition, 
    en cas ou vous aller utiliser une BD deja pret sur mongodb sa ne marchera pas, parcque
    mon programme insert les donnees à partir de la source en miniscule.
    

##2-Technologies:

  L'application utilise les technologies suivantes :
  
  - Node.js 6.9.2
  - express.js 4.14.0
  - MongoDB 3.2.10
  - HTML5
  - CSS
  - jQuery 3.2.1
  - Bootstrap 3.3.7
  - dataTables 1.10.16

##3-Installation:

  Après avoir installé Node.js et MongoDB, installer les dépendances de l'application en ouvrant un invite de commande et y inscrire ce qui suit:

    cd INF4375
    npm install


##4-Exécution:

  1. Démarrer le serveur de base de données MongoDB, en exécutant la commande suivante:
  
    `mongod`


  2. Ouvrir un autre invite de commande et exécuter l'application à l'aide de la commande suivante:

    `npm start`
	

  3. Accéder aux différentes fonctionnalités de l'application.
  

##5-Les URLs des interfaces graphiques en HTML

  Lien heroku :
  [https://tpinf-4375.herokuapp.com](https://tpinf-4375.herokuapp.com)

  Rechercher des installations par arrondissement ou par nom d'installation:
  [http://localhost:3000](http://localhost:3000)

  La documentation de tous les services REST de l'application:
  [http://localhost:3000/doc](http://localhost:3000/doc)
