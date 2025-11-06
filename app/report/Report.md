## Introduction

Ce projet vise à concevoir une application permettant de visualiser l’état actuel du réseau de transport urbain, de consulter les conditions météorologiques en temps réel, ainsi que d’analyser des statistiques globales et spécifiques à chaque ligne. L’interface principale repose sur une carte interactive affichant les lignes, les arrêts et des informations dynamiques liées au trafic et aux perturbations.

L’objectif est d’offrir une vision claire, synthétique et contextualisée du réseau afin d’aider les usagers à anticiper leurs déplacements.

### Objectifs Fonctionnels

L’application doit permettre à l’utilisateur de :

- Consulter la météo actuelle sur la zone géographique concernée, incluant les conditions, la température et un indicateur visuel représentatif.

- Visualiser les lignes de bus sur une carte interactive, accompagnées de l’ensemble des arrêts et d’un indicateur d’état (trafic fluide, perturbé ou interrompu).

- Accéder aux informations détaillées d’une ligne, telles que les incidents en cours, les incidents historiques, ainsi que des prévisions de perturbations quand elles sont disponibles.

- Analyser des statistiques globales du réseau, mettant en évidence les lignes les plus impactées, le niveau global de perturbation et les tendances temporelles.

## Diagramme de Cas d'Utilisation

Pour représenter les interactions entre les utilisateurs et le système, un diagramme de cas d'utilisation a été élaboré. Ce diagramme illustre les principales fonctionnalités accessibles aux utilisateurs, telles que la consultation de la météo, la visualisation des lignes de bus, l'accès aux détails des lignes et l'analyse des statistiques.

![](./images\DCU.png)

## Diagramme de Classes

Le diagramme de classes ci-dessous présenta la structure de notre back-end, mettant en évidence les principales entités, leurs attributs et les relations entre elles. Ce diagramme est essentiel pour comprendre comment les données sont organisées et gérées au sein de l'application.
Elle constituera la base pour nos appels API et la gestion des données.
Cette partie est cruciale pour assurer une architecture solide et évolutive de notre application.
Elle a été discutée et validée avec Alexandre Bidaux avant de commencer le développement afin de se mettre d'accord sur la communication entre nos deux TX.

![](./images\DC.png)

On peut ainsi générer à partir de ce schema notre API RESTful avec les routes suivantes :

https://editor.swagger.io/?url=https://gitlab.utc.fr/clmartin/pr_subway_martins_bidaux/-/blob/app/app/report/APIREST.yaml?ref_type=heads
