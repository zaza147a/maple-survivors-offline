"""Convert authorized PNG frames to a Phaser JSON atlas. Requires Pillow."""
import argparse,json,math
from pathlib import Path
from PIL import Image

def convert(source, output, columns=8):
    paths=sorted(Path(source).glob('*.png'))
    if not paths or columns<1: raise ValueError('PNG frames and positive columns required')
    images=[Image.open(p).convert('RGBA') for p in paths]
    w=max(i.width for i in images);h=max(i.height for i in images)
    cols=min(columns,len(images));rows=math.ceil(len(images)/cols)
    if cols*w>8192 or rows*h>8192: raise ValueError('atlas exceeds 8192 pixels')
    atlas=Image.new('RGBA',(cols*w,rows*h));frames={}
    for n,(p,im) in enumerate(zip(paths,images)):
        x=(n%cols)*w+(w-im.width)//2;y=(n//cols)*h+h-im.height
        atlas.paste(im,(x,y));frames[p.stem]={'frame':{'x':x,'y':y,'w':im.width,'h':im.height},'rotated':False,'trimmed':False,'spriteSourceSize':{'x':0,'y':0,'w':im.width,'h':im.height},'sourceSize':{'w':im.width,'h':im.height},'pivot':{'x':.5,'y':1}}
    output=Path(output);output.parent.mkdir(parents=True,exist_ok=True);atlas.save(output.with_suffix('.png'));output.with_suffix('.json').write_text(json.dumps({'frames':frames,'meta':{'image':output.with_suffix('.png').name,'size':{'w':atlas.width,'h':atlas.height},'scale':'1'}},indent=2))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('source');p.add_argument('output');p.add_argument('--columns',type=int,default=8);a=p.parse_args();convert(a.source,a.output,a.columns)
