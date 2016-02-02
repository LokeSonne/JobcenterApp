# README #

### Hvordan kommer jeg igang? ###
For at køre projektet skal node, cordova, ionic, gulp og Bower være installeret. 
Desuden benytter gulp sig af forskellige packages som er specificeret i package.json. Kør '**npm install**' for at installere alle pakker specificeret i package.json

Herefter køres '**ionic serve**' i terminalen for at starte projektet op.
'**Ionic serve**'  watcher sass mappen og compiler til css, starter en server op på localhost:8100, samt kører en task der injecter alle dependencies fra bower.json ind i index.html.

Alle dependencies installeres via Bower (Husk --save flag for at skrive til bower.json), ex '**bower install jquery --save**'.

### Hvad eller? ###
Alle plugins bruger ng-cordova http://ngcordova.com/. Check det ud hvis I skal bruge et plugin, fx geolocation, network eller lignende.

### Kendte problemer ###
Crosswalk anerkender åbenbart ikke de whitelistede urls i config.xml og returnerer 404 ved fx hentning af google maps api og kort tiles. Derfor :
I \"platforms\android\src\org\crosswalk\engine\XWalkCordovaResourceClient.java" linje 204 udkommenter 'return new WebResourceResponse("text/plain", "UTF-8", null);' 
http://forum.ionicframework.com/t/crosswalk-whitelist/20329
 
OBS OBSOBS SKulle være løst med metadata tagget i index.html samt cordova-whitelist pluginnet.

###Release###

####Generel release###
i constants.js sættes dev til false, Endpoint sættes til live endpoint.
Kør 'gulp cache_templates' for at smide html i templates.js
Der laves et build med release-flag og MUILD_MULTIPLE_APKS sat til true : **MUILD_MULTIPLE_APKS=true ionic build android --release**


###Release procedure for android.###
Grundlæggende information kan findes her http://ionicframework.com/docs/guide/publishing.html.
For nemheds skyld så flyt Apk'en og keystore filen til samme mappe.
Derefter skal en key laves. Derefter skal den key bruges til at signe de outputtede apk-filer (findes i platforms/android/build/outputs/apk).
**jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore certificates/android/release/jobcenterapp.keystore android-armv7-release-unsigned.apk alias_name**, koden er : sonnenielsen

Derefter skal den signede fil pakkes/zippes med zipalign. Zipalign er placeret i android sdk, så zipalign skal kaldes herfra. Zipalign er placeret i build-tools i android sdk.
**/usr/local/Cellar/android-sdk/24.3.4/build-tools/23.0.0/zipalign -v 4 android-armv7-release-unsigned.apk sonnenielsen.apk**

Det outputtede fra zipalign kan derefter uploades til app store.



###Start ipad emulator###
 ionic emulate ios --livereload --target="iPad-2"