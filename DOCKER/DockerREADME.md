**docker-compose up**: Ez a parancs futtatja az alkalmazást a docker-compose.yml fájlban megadott összes konténerrel együtt. Ha nincs fájl megadva, akkor a parancs a docker-compose.yml fájlt keresi.

**docker-compose down**: Ez a parancs leállítja az összes alkalmazáskonténert, amelyeket a docker-compose.yml fájlban definiáltak.

**docker-compose ps**: Ez a parancs listázza az összes aktív Docker konténert, amelyeket a docker-compose.yml fájlban definiáltak.

**docker-compose build**: Ez a parancs felépíti az összes Docker image-t, amelyeket a docker-compose.yml fájlban definiáltak.

**docker-compose restart**: Ez a parancs újraindítja az összes alkalmazáskonténert, amelyeket a docker-compose.yml fájlban definiáltak.

docker-compose logs: Ez a parancs kiírja az összes alkalmazáskonténer naplóbejegyzéseit, amelyeket a docker-compose.yml fájlban definiáltak.

**docker-compose exec**: Ez a parancs lehetővé teszi a felhasználó számára, hogy belépjen az alkalmazáskonténerekbe és parancsokat adjon hozzájuk.

**docker start <container_name>**: Ez a parancs elindítja az adott nevű Docker konténert, ha az nem fut már.

**docker stop <container_name>**: Ez a parancs leállítja az adott nevű Docker konténert, amennyiben az fut.