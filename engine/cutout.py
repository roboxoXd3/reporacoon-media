import sys, numpy as np, glob, os
from PIL import Image
from scipy import ndimage as nd
src='/mnt/user-data/uploads/Downloads/RianInfotech/Content/claudeVideoAssets/mascot2'
for f in sorted(glob.glob(src+'/*.jpg')):
    im=np.asarray(Image.open(f).convert('RGB')).astype(float)
    r,g,b=im[...,0],im[...,1],im[...,2]
    mag=(r>150)&(b>150)&(g<120)&(np.abs(r-b)<90)
    lab,n=nd.label(mag); sizes=nd.sum(mag,lab,range(1,n+1))
    bg=np.isin(lab,[i+1 for i,s in enumerate(sizes) if s>150])
    bg=nd.binary_dilation(bg,iterations=1)
    a=(~bg).astype(float); a=nd.gaussian_filter(a,0.7)
    out=im.copy(); spill=np.clip(np.minimum(r,b)-g,0,None)*0.5  # despill magenta fringe
    m=(a<0.99)
    out[...,0]=np.where(m,r-spill,r); out[...,2]=np.where(m,b-spill,b)
    rgba=np.dstack([np.clip(out,0,255),a*255]).astype(np.uint8)
    img=Image.fromarray(rgba); bb=img.getbbox(); img=img.crop(bb)
    name=os.path.basename(f)[:-4]; img.save(f'scene/img/m/{name}.png'); print(name,img.size)
