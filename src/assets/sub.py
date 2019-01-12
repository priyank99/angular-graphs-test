import urllib.request
import requests
import os, time
from datetime import datetime
import csv
import json

channels = ["tseries", "PewDiePie"]
key = "AIzaSyCECUaDov8MBgvEvE9jgJuRKvk8Yjj1nE0"
subs = {}

def get_stats(channel_list, stats):
    for i in range(len(channel_list)):
            resp = requests.get("https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=" + channel_list[i] + "&key=" + key).json()
            stats[channels[i]] = {}
            stats[channels[i]]["subsCount"] = resp["items"][0]["statistics"]["subscriberCount"]
            stats[channels[i]]["viewCount"] = resp["items"][0]["statistics"]["viewCount"]

    for channel in stats:
        print(channel)
        print(stats[channel])




def log_subs(channel_list, stats):

    csvfile = os.path.join('.' + os.path.sep , 'counts.csv')

    with open(csvfile, 'a', newline='') as statsFile:
        writer = csv.writer(statsFile, delimiter=',')
        writer.writerow([datetime.now(), channels[0], stats[channels[0]]["subsCount"], stats[channels[0]]["viewCount"], channels[1], stats[channels[1]]["subsCount"], stats[channels[1]]["viewCount"], int(stats[channels[1]]["subsCount"]) - int(stats[channels[0]]["subsCount"]), int(stats[channels[1]]["viewCount"]) - int(stats[channels[0]]["viewCount"])  ])
    print('---subs gap: ' + str( int(stats[channels[1]]["subsCount"]) - int(stats[channels[0]]["subsCount"]) ) )
    print('---views gap: ' + str( int(stats[channels[1]]["viewCount"]) - int(stats[channels[0]]["viewCount"]) ) )

if __name__ == '__main__':
    ytstats = {}
    i=0
    minutes = (15)
    while(i<50):
        i = i+1
        get_stats(channels, ytstats)
        log_subs(channels, ytstats)
        time.sleep(minutes*60)
