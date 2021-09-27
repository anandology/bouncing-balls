import time
import json

def sendmsg(msgtype, **kwargs):
  """Sends a message to the frontend.

  The frontend will receive the specified message whenever
  this function is called. The frontend can decide to some
  action on each of these messages.
  """
  msg = dict(msgtype=msgtype, **kwargs)
  print("--MSG--", json.dumps(msg))

def circle(x=0, y=0, r=50, fill="none", stroke="black"):
    sendmsg("draw", shape="circle", args=locals())

def rectangle(x=0, y=0, w=200, h=100, fill="none", stroke="black"):
    sendmsg("draw", shape="rectangle", args=locals())

def show():
    """shows the image drawn so far.

    Having explicit show enables the js driver to use double buffering.
    """
    sendmsg("show")

width = 800
height = 400

dx = 5
dy = 5
x, y = 400, 300
r = 25

while True:
    circle(x=x, y=y, r=r, fill="red")
    show()
    x += dx
    y += dy
    if x-r < 0:
        x = r
        dx *= -1
    elif x+r > width:
        x = width-r
        dx *= -1

    if y-r < 0:
        y = r
        dy *= -1
    elif y+r > height:
        y = height-r
        dy *= -1

    print(x, dx, y, dy)

    time.sleep(1/30) # 30 fps