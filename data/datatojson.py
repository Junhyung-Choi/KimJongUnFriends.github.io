import pandas
import os
import numpy as np

df = pandas.read_csv(os.getcwd()+ '/data/data.csv')
actKind = {
			"군사" : ["부대", "군인", "인민군", "혁명군", "무기", "발사", "군사", "조선인민군"],
			"노동당" : ["당 중앙위원회", "당대회", "당"],
			"행사" : ["행사","준공식"],
			"어쩌구":["저쩌구"]
			}
fDict = {}

f = open("data.json","w")
f.close()

year_list = []
for i in df.index:
	year_list.append(int(df["date"][i][:4]))
df["year"] = year_list

print(df)

fSereis = df['friend'].dropna()
for friends in fSereis:
	friends_list = list(friends.split(","))
	for f in friends_list:
		if f not in fDict.keys():
			fDict[f] = 1
		else:
			fDict[f] += 1
fDict = dict(sorted(fDict.items(),key = lambda x: x[1], reverse=True))

fyDict = {
			"2012":{},
			"2013":{},
			"2014":{},
			"2015":{},
			"2016":{},
			"2017":{},
			"2018":{},
			"2019":{},
			"2020":{},
			"2021":{},
			"2022":{}
		 }


for year in range(2012,2023):
	fSeries = df[df['date'][:4] == year]['friend'].dropna()
	for friends in fSereis:
		friends_list = list(friends.split(","))
		for f in friends_list:
			syear = str(year)
			if f not in fyDict[syear].keys():
				fyDict[syear][f] = 1
			else:
				fyDict[syear][f] += 1

print(fyDict)


def isKeyinAct(act :str,key):
	act = act.strip()
	if(key in act):
		return True
	else:
		return False
