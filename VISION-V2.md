# Marrakech Palace - Vision du site, version 2

13 septembre 2026. Direction générale appréciée par le propriétaire. Mise à jour de la conception uniquement ; aucun développement ni publication.

**Complément après revue des références :** [Citystar et Village Cap Ghir](REFERENCE-REVIEW.md). Cette revue précise l'évolution du héros, l'apparition plus tôt du domaine, l'explorateur Intérieurs / Plans 2D / Films et le rythme des séquences. Les sept pages, les médias du propriétaire et les téléchargements directs sont conservés. Les images V2 n'ont pas été régénérées lors de cette revue.

## Direction retenue

Conserver l'élégance chaleureuse de la première proposition : ivoire, brun profond, touches de bronze, typographie à empattements, espaces généreux et images de grande taille. Donner désormais au site une présence cinématographique avec les vidéos du propriétaire, et une vraie profondeur de visite grâce à des pages distinctes.

**Signature proposée : « Le luxe d'avoir son propre horizon. »**

Le parcours doit donner envie, permettre de comprendre les villas, puis faciliter une prise de contact. Les prestations techniques restent consultables dans le CPS téléchargeable, avec une présentation commerciale courte dans les pages du site.

## Arborescence : sept pages

| Page | Intention et contenu | Action principale |
| --- | --- | --- |
| **Accueil** | Vidéo extérieure, promesse, trois chiffres essentiels, aperçu des intérieurs, accès aux autres pages, repère de localisation, téléchargements et contact | Découvrir les villas |
| **Le domaine** | Douze villas, intimité, jardins, ambiance de jour et de nuit, plan de masse lorsqu'un fichier validé est disponible ; rubrique « L'art de vivre » pour les équipements | Explorer les villas / Organiser une visite |
| **Les villas** | Présentation des espaces sur deux niveaux, visualisation des plans, sélection de la variante du RDC, séquences intérieures et terrasses | Choisir une configuration puis demander une visite |
| **Galerie** | Photos et vidéos regroupées par Extérieurs, Rez-de-chaussée et Premier étage ; visionneuse grand format avec légendes | Explorer les espaces / Organiser une visite |
| **Localisation** | Présentation d'Ouled Hassoune, carte interactive au repère communiqué, ouverture dans Google Maps et itinéraire | Obtenir l'itinéraire |
| **Documents** | Présentation claire des deux PDF, consultation et téléchargement direct | Télécharger la brochure / Télécharger le CPS |
| **Contact** | Invitation à échanger ou visiter, formulaire court, coordonnées commerciales dès leur fourniture, rappel de la localisation et carte | Demander une visite |

Navigation principale : logo vers l'accueil, **Le domaine · Les villas · Galerie · Localisation**, lien **Documents** discret, bouton **Organiser une visite** vers Contact. Le pied de page donne accès à toutes les pages. « L'art de vivre » est une rubrique du Domaine, pour éviter une page supplémentaire répétitive.

## Accueil et vidéo principale

La scène de référence est la vue piscine **`images/exterior/v2day.png`**, avec son original agrandi **`v2day upscale.jpeg`**. Elle correspond à la villa utilisée dans la première proposition. La version animée de cette scène remplacera le fond fixe du héros.

- Une séquence lente, continue, sans coupes brusques, lancée sans son et en boucle lorsque les conditions de lecture le permettent.
- La façade, le jardin et la piscine restent visibles. Le texte reste immobile et lisible pendant le mouvement.
- Un contrôle discret permet de mettre en pause ou de reprendre.
- Le rendu fixe correspondant sert d'affiche pendant le chargement, en cas d'échec de lecture ou lorsque l'utilisateur préfère limiter le mouvement.
- Sur téléphone, adapter le cadrage à la villa et garder l'accès aux boutons. Si la vidéo se prête mal à un recadrage vertical, retenir une composition qui conserve l'architecture et place le texte dans une zone lisible.

Texte d'ouverture conservé :

> UN DOMAINE PRIVÉ À MARRAKECH
>
> Le luxe d'avoir son propre horizon.
>
> Douze villas contemporaines. Jardins et piscines privés.

Actions : **Découvrir les villas** et, en lien secondaire, **Télécharger la brochure**. Le bouton de visite reste dans l'en-tête.

Après le héros : **12 villas individuelles · 422 m² de surface couverte · 1 414 à 1 903 m² de terrain privatif**, puis un aperçu intérieur, des entrées vers le Domaine et la Galerie, une invitation à découvrir la localisation, les deux documents et une section contact. La maquette condensée montre les séquences principales, pas chaque bloc de la future page complète.

Après étude des références, placer désormais une **présentation du domaine et un aperçu du plan de masse avant les intérieurs**, puis développer les séquences jardin/piscine et vie quotidienne. Le parcours détaillé figure dans le complément de revue. Une navigation superposée au film, devenant ivoire au défilement, est proposée pour donner davantage d'ampleur au premier écran.

## Les villas : plans et variantes

Le propriétaire confirme deux variantes au rez-de-chaussée. La lecture des fichiers et du CPS établit la correspondance suivante :

| Sélection du visiteur | Fichier source à afficher | Présentation |
| --- | --- | --- |
| Rez-de-chaussée / **Salon** | `images/2D/RDC2.png` | Configuration de base, avec salon supplémentaire |
| Rez-de-chaussée / **Chambre + salle de bain** | `images/2D/RDC1.png` | Variante comportant chambre, douche et WC privatifs |
| **Premier étage** | `images/2D/1ET.png` | Plan de l'étage, commun aux deux variantes du RDC |

L'ordre des noms de fichiers ne correspond pas à l'ordre commercial : **RDC2 est la base avec salon ; RDC1 est l'option chambre.**

Deux commandes simples : choix du niveau, puis choix de la configuration uniquement pour le RDC. Le plan change au même emplacement et à la même échelle pour faciliter la comparaison. Un bouton **Agrandir le plan** ouvre une vue avec zoom. Les plans restent fixes et lisibles ; les vidéos illustrent les pièces.

Évolution après revue des références : réunir cette vue dans un explorateur **Intérieurs / Plans 2D / Films**, ouvert initialement sur les intérieurs. Les choix du niveau et de la variante persistent entre les modes lorsque les médias correspondants existent. Les animations fournies seront présentées comme des films ; elles ne constituent pas un visualiseur 360°.

Pour la configuration salon : **« Le plaisir de recevoir. »** Pour l'option chambre : **« Une chambre de plain-pied, selon votre projet de vie. »** Le texte rappelle discrètement que le choix de l'option intervient avant le second œuvre, conformément au CPS. Le contact peut conserver la configuration choisie pour contextualiser la demande, sans prétendre la réserver.

Le plan de l'étage montre quatre chambres. Les nombres commerciaux de chambres et salles de bains restent à confirmer avant publication ; les noms de configurations ci-dessus expriment directement la différence vérifiée.

La réalisation future utilisera les trois fichiers source eux-mêmes, avec leurs proportions préservées. Les plans intégrés aux images de concept sont des illustrations de la mise en page, pas de nouveaux plans de vente ni des relevés cotés.

## Intérieurs et galerie en mouvement

L'inventaire contient **40 fichiers image** : 8 extérieurs, 3 plans, 15 intérieurs RDC et 14 intérieurs du premier étage. Ce total comprend les variantes de cadrage et les versions agrandies. Les originaux ont été conservés sans modification.

Les fichiers vidéo ne sont pas encore présents dans le dossier inspecté. Le propriétaire indique avoir animé les rendus et prévoit de copier les clips. Aucune animation n'a été fabriquée ou inspectée pendant cette mise à jour.

| Famille | Contenu disponible | Usage proposé |
| --- | --- | --- |
| Extérieurs | V1 jour/nuit, V2 piscine jour/nuit, versions agrandies | Héros V2 jour ; séquences d'ambiance jour/nuit dans Domaine et Galerie |
| RDC | Hall, cuisine/salle à manger, salons 1 et 2, escalier, chambre, salle de bain | Parcours « L'art de recevoir » ; chambre rattachée explicitement à la variante correspondante |
| Premier étage | Quatre chambres, salles de bain, dressing, hall/salon, escalier, terrasse | Parcours « Les espaces privés » et atmosphère du salon de l'étage |
| Plans | RDC1, RDC2, 1ET | Comparaison des configurations et compréhension de la distribution |

Sélection éditoriale initiale :

- Accueil : scène piscine `exterior/v2day.png` et salon de l'étage `interiors/1ET/HALL V1 (2).png`.
- RDC : `HALL 1 V2.png`, `KITCHEN 1 V1.png`, `SALON 1 V1 UP.jpeg` et `SALON 2 V2.png` pour raconter réception, cuisine et salons ; `BEDROOM 1V1.png` pour l'option.
- Étage : `BEDROOM 1 V1.png`, `BEDROOM 2 V1 (2).png`, `DRESSINGROOM 1 V1 (2).png`, `TERRACE 1 V1.png` et `HALL V1 (2).png`.
- Domaine en soirée : `exterior/v2night.png` et `exterior/V1night.png`.

Les chemins de cette sélection sont relatifs au dossier `images`. Les noms bruts ne seront pas affichés aux visiteurs. Les légendes devront refléter le niveau réel ; le salon au mobilier arrondi utilisé dans les maquettes appartient au **premier étage**.

Une image fixe ouvre chaque scène, avec une commande vidéo lorsqu'un clip existe. Une seule séquence est active à la fois ; le visiteur peut arrêter, agrandir et naviguer entre les vues. Une galerie ne doit pas lancer tous les films ensemble. Le son éventuel est activé uniquement à la demande. Les clips de pièces restent identifiés comme vidéos d'ambiance, sans être présentés comme une visite 360° ou un espace 3D navigable.

Les rendus extérieurs agrandis sont très volumineux, jusqu'à 13 376 × 7 520 pixels et environ 36 Mo. Ce sont des sources de travail ; les versions pour l'écran seront préparées pendant le développement, tout en conservant les originaux.

## Documents : deux accès clairement nommés

Bloc public **« Le projet, en détail. »**, avec deux lignes élégantes :

1. **Brochure du projet** - Découvrir Marrakech Palace. Boutons **Consulter** et **Télécharger la brochure**.
2. **Cahier des prestations (CPS)** - Les prestations détaillées. Boutons **Consulter** et **Télécharger le CPS**.

Les téléchargements seront directs, sans formulaire imposé. Ils seront accessibles depuis Documents, le bas de l'accueil, Les villas et le pied de page. La brochure dispose aussi d'un lien discret dans le héros. Les détails techniques restent dans le PDF et ne deviennent pas une longue section du site.

Fichiers disponibles :

- Brochure : `C:/Users/zakaria/Desktop/MAGDESIGNSTUDIO/Brochure Villa Marrakesh/Brochure/Brochure Villa Marrakech R4.pdf`.
- CPS : `C:/Users/zakaria/Desktop/MAGDESIGNSTUDIO/Brochure Villa Marrakesh/CPS/CPS VILLA OULED HASSOUN [new].pdf`.

Les deux documents sont identifiés pour la future intégration, sans modification ni publication à ce stade. Les divergences documentaires déjà enregistrées dans le brief ne sont pas résolues par cette mise à jour.

## Localisation : repère communiqué par le propriétaire

[Ouvrir le repère Marrakech Palace fourni sur Google Maps](https://www.google.com/maps/place/Marrakech+palace/@31.6550344,-7.8078528,17z/data=!3m1!4b1!4m6!3m5!1s0xdaff729332933bf:0x78d61a39923d5344!8m2!3d31.6550299!4d-7.8052779!16s%2Fg%2F11rq3wdxwj?entry=ttu).

Coordonnées du **repère** encodées dans le lien utilisateur : **31.6550299, -7.8052779**. Ne pas les confondre avec les coordonnées du centre de la vue cartographique situées après `@` dans l'URL. Le lien fourni est la référence de localisation de cette conception. La consultation automatisée de la page Google Maps n'a pas abouti ; aucune durée de trajet ni information d'établissement n'a été vérifiée indépendamment.

Prévoir une vraie carte interactive sur **Localisation**, centrée sur ce repère, avec un cadrage initial permettant de comprendre la relation à Marrakech. Deux actions : **Ouvrir dans Google Maps** et **Obtenir l'itinéraire**. La page Contact reprend un aperçu de carte avec le même repère. L'accueil peut se limiter à une invitation sobre vers Localisation.

Garder les mentions d'attribution du fournisseur visibles. La présentation du site peut encadrer la carte avec ses couleurs, sans dessiner de faux itinéraires ou modifier la géographie. Les temps du CPS restent des indications historiques à vérifier si l'on décide de les afficher.

## Contact et demande de visite

Section de fin d'accueil sur fond brun profond, puis page Contact dédiée avec la même invitation : **« Et si tout commençait par une visite ? »**

- Nom.
- E-mail ou téléphone, avec au moins un moyen de réponse.
- Message facultatif.
- Bouton **Demander une visite**.

Un choix facultatif peut distinguer demande de visite et demande d'informations. La confirmation future indiquera qu'une demande a été reçue, avec prise de contact par l'équipe ; elle ne confirmera pas automatiquement un rendez-vous. Un bouton d'appel et WhatsApp pourront être ajoutés avec les coordonnées commerciales réelles. Aucune adresse électronique, aucun numéro et aucun délai de réponse n'ont été inventés dans les maquettes.

Sur téléphone : menu compact, accès facile à la visite, plans à agrandir, formulaires lisibles et commandes de lecture accessibles. Les boutons flottants éventuels doivent laisser les images et formulaires dégagés.

## Éléments reçus et éléments attendus

**Reçus :** direction artistique validée dans son ensemble ; 40 rendus/plans ; existence et correspondance des deux variantes confirmées ; lien de localisation ; demande explicite de pages supplémentaires, téléchargements et contact.

**Attendus pour la suite :** clips animés, identification du clip extérieur V2 jour, coordonnées commerciales et destination des demandes. Les autres points factuels ouverts restent détaillés dans le brief. Ils ne bloquent pas cette conception.

Pour relier les vidéos aux images, conserver si possible les mêmes noms de scènes et le classement Extérieurs / RDC / 1ET. Aucun format vidéo définitif n'est imposé maintenant ; les fichiers seront examinés avant les choix de diffusion.

## Livrables de cette mise à jour

- [Accueil V2](concept/marrakech-palace-homepage-v2.png) : héros vidéo représenté par une image fixe, documents et contact.
- [Page Les villas V2](concept/marrakech-palace-villas-v2.png) : sélecteur de niveau, variante et entrée vers les intérieurs.
- [Prompt accueil V2](concept/homepage-v2-prompt.txt) et [prompt villas V2](concept/villas-v2-prompt.txt), utilisés avec l'outil intégré ImageGen.
- [Inventaire complet des rendus](research/render-inventory.json).

Les deux maquettes sont statiques. Un jeu de sept planches couvrant toutes les pages est maintenant disponible dans [concept/all-pages-v3](concept/all-pages-v3) et dans sa [planche contact](concept/all-pages-v3/all-pages-contact-sheet.jpg). Les planches Accueil et Les villas reprennent les concepts V2 ; les cinq autres sont composées à partir des rendus, plans, couvertures de documents et carte fournis afin de valider rapidement le parcours complet. Elles restent des références de direction artistique : aucun site, formulaire, téléchargement public, carte intégrée ou lecteur vidéo fonctionnel n'a été créé.
