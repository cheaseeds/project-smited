# Cassandra with Python (and Flask) in docker-composer:

## Components:

### Init scripts:
* Creates and populates tables

### Proj-smited:
* React front end of the application

## Steps:

* ```docker-composer build```
    * This step will take a few minutes to build.


* ```docker-compose up```
    * This step will take a few seconds to come up because the Cassandra cluster has to initialize.

## Clean:
* ```docker-compose rm -f```
    * Call this before to clear containers    



