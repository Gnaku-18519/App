'''@author AJWuu'''

import pyautogui

screenWidth, screenHeight = pyautogui.size() #get the size of the primary monitor
currentMouseX, currentMouseY = pyautogui.position() #get the X,Y position of the mouse

#Click
pyautogui.click(200,200) #move the mouse to XY coordinates and click it

pyautogui.moveTo(30,30) #move first and then click (split the previous command into two)
pyautogui.click()

pyautogui.moveTo(1650, 1080, duration=5, tween=pyautogui.easeInOutQuad) #use tweening/easing function to move mouse over 2 seconds
pyautogui.click()

#Double-Click
pyautogui.moveTo(816, 1080, duration=5, tween=pyautogui.easeInOutQuad) #use tweening/easing function to move mouse over 2 seconds
pyautogui.doubleClick()

#Picture-Click
pyautogui.click('button.png') #find where button.png appears on the screen and click it

#Type / Write
pyautogui.write('Hello world!', interval=0.25) #type with quarter-second pause in between each key

#Press Key(s)
pyautogui.press('esc') #press the Esc key -- ALL key names are in pyautogui.KEY_NAMES
with pyautogui.hold('shift'): #press the Shift key down and hold it
    pyautogui.press(['left', 'left', 'left', 'left']) #press the left arrow key 4 times
#Shift key is released automatically
pyautogui.hotkey('ctrl', 'c') #press the Ctrl-C hotkey combination

#Alert Box
pyautogui.alert('This is the message to display.') #make an alert box appear and pause the program until OK is clicked
