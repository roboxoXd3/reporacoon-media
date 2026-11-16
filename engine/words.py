import json, re
# (speaker, start, end, text) segments split at detected pauses
SEG = [
 ('R',0.00,4.29,"Send a four gig video from your phone to your laptop. No cable. No internet. Go."),
 ('I',4.78,9.08,"Easy! I'll build a local server, an Android app, a desktop app, add encryption..."),
 ('I',9.37,9.98,"give me three months."),
 ('R',10.64,11.40,"Three months?"),
 ('I',11.92,12.60,"Okay... two?"),
 ('R',13.19,18.23,"Rule number one. Before you build anything, check what already exists. It's called LocalSend."),
 ('R',18.50,22.90,"Free, open source, and it runs on Android, iPhone, Windows, Mac and Linux."),
 ('R',23.20,25.70,"Same Wi-Fi, open the app, tap the device."),
 ('R',25.99,26.37,"Done."),
 ('R',26.63,29.04,"No account. No internet. Fully encrypted."),
 ('I',29.73,31.57,"So... what do I do with my three months?"),
 ('R',32.18,33.73,"Build something that doesn't exist yet."),
 ('R',34.17,36.10,"Comment SEND, and I'll DM you the link."),
]
W=[]
for sp,a,b,txt in SEG:
    ws=txt.split()
    wgt=[len(re.sub(r'[^A-Za-z0-9]','',w))+1.5+(2.5 if re.search(r'[.,!?]$',w) else 0) for w in ws]
    tot=sum(wgt); t=a
    for w,g in zip(ws,wgt):
        d=(b-a)*g/tot; W.append({'w':w,'s':round(t,3),'e':round(t+d,3),'sp':sp}); t+=d
json.dump(W,open('words.json','w'))
open('words.js','w').write('const WORDS='+json.dumps(W)+';')
for i,w in enumerate(W): print(i,w['w'],w['s'],w['sp'])
