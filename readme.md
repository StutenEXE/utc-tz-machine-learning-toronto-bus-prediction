# PR - Predictive system for the delay in public transports

## Datasources

| Name | Data | Type | Source | Date | Additionnal info |
|------|------|------|--------|------|------------------|
| TTC Delays and Routes 2023 | Toronto's bus delays | Dataset | [Kaggle] | 2025-10-15 | |
| Hourly climate data | Canadian weather reports | Dataset | [Government of Canada] | 2025-10-15 | Used station of id : 6158359 |

<!-- Links to cleanup the md code -->
[Kaggle]: https://www.kaggle.com/datasets/karmansinghbains/ttc-delays-and-routes-2023
[Government of Canada]: https://climate-change.canada.ca/climate-data/#/hourly-climate-data

## Explored datasources

| Name | Data | Type | Source | Date |
|------|------|------|--------|------|
| PRIM - Traffic Info Messages (v2) | Current, upcoming and past disruption info | API | [PRIM API] | 2025-10-05 |
| INFOCLIMAT - Weather data | Current and past weather data | API | [INFOCLIMAT API] | 2025-10-05 |

<!-- Links to cleanup the md code -->
[PRIM API]: https://prim.iledefrance-mobilites.fr/en/apis/idfm-navitia-line_reports-v2
[INFOCLIMAT API]: https://www.infoclimat.fr/opendata/

> PRIM - Traffic Info Messages (v2) seems to be still in development, we only have elevator incidents for metro and RER
