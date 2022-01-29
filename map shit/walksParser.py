import glob
import os
from time import sleep
from unittest import skip
import xml.etree.ElementTree as ET
import re
import json
import time

tcx_files = glob.glob('tsc/*.tcx')
start = time.time()
time_holder = 0
skipCounter = 0
counter = 0

readFiles = []

mySecondJSON = {
    "type": "FeatureCollection",
    "features": []
    }

with open("track.geojson", "w") as fileJSON:
    json.dump(mySecondJSON, fileJSON)

if not tcx_files:
	print(tcx_files)
	exit('cant find *.tcx in tcx')

with open('translatedFiles.txt')  as tfTXT:
    for line in tfTXT:
        readFiles.append(re.sub(r'\n', '',line))

for tcx_file in tcx_files:
    if re.sub(r'tsc\\', '', tcx_file) not in readFiles: 
        print(re.sub(r'tsc\\', '', tcx_file))
        tree = ET.parse(tcx_file)
        for elem in tree.iter('{http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2}Position'):
            if skipCounter == 0:
                lon = elem.find('{http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2}LongitudeDegrees').text
                lat = elem.find('{http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2}LatitudeDegrees').text
                counter += 1
                dataJSON = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            lon,
                            lat
                        ]
                    }
                }
                with open("track.geojson", "r+") as fileJSON:
                        file_data = json.load(fileJSON)
                        file_data["features"].append(dataJSON)
                        fileJSON.seek(0)
                        json.dump(file_data, fileJSON, indent = 4)
                skipCounter = 4;
            else:
                skipCounter -= 1;
        with open('translatedFiles.txt', 'a') as fil:
            fil.write(re.sub(r'tsc\\', '', tcx_file) + '\n')

end = time.time()
print("\nElapsed time: {}seconds\nLines read: {}".format((end - start), counter))