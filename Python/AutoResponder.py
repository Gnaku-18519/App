import pyautogui
import time
import xlrd
import pyperclip


def mouseClick(clickTimes,LorR,img,retry):
    if retry == 1:
        while True:
            location = pyautogui.locateCenterOnScreen(img,confidence=0.9)
            if location is not None:
                pyautogui.click(location.x,location.y,clicks=clickTimes,interval=0.2,duration=0.2,button=LorR)
                break
            print("Didn't find a corresponding image, retry in 0.1 seconds")
            time.sleep(0.1)
    elif retry == -1:
        while True:
            location = pyautogui.locateCenterOnScreen(img,confidence=0.9)
            if location is not None:
                pyautogui.click(location.x,location.y,clicks=clickTimes,interval=0.2,duration=0.2,button=LorR)
            time.sleep(0.1)
    elif retry > 1:
        i = 1
        while i < retry + 1:
            location = pyautogui.locateCenterOnScreen(img,confidence=0.9)
            if location is not None:
                pyautogui.click(location.x,location.y,clicks=clickTimes,interval=0.2,duration=0.2,button=LorR)
                print("Repeat")
                i += 1
            time.sleep(0.1)


# cmdType.value  1.0 - left click
#                2.0 - left double-click
#                3.0 - right click
#                4.0 - input
#                5.0 - wait
#                6.0 - scroll
# ctype     empty：0
#           string：1
#           number：2
#           date：3
#           boolean：4
#           error：5
def dataCheck(sheet1):
    checkCmd = True
    # line number check
    if sheet1.nrows < 2:
        print("No data")
        checkCmd = False
    # check every line
    i = 1
    while i < sheet1.nrows:
        # column 1 - operation check
        cmdType = sheet1.row(i)[0]
        if cmdType.ctype != 2 or (cmdType.value != 1.0 and cmdType.value != 2.0 and cmdType.value != 3.0 
        and cmdType.value != 4.0 and cmdType.value != 5.0 and cmdType.value != 6.0):
            print('第',i+1,"行,第1列数据有毛病")
            checkCmd = False
        # column 2 - content check
        cmdValue = sheet1.row(i)[1]
        # read in operation types (must be string)
        if cmdType.value == 1.0 or cmdType.value == 2.0 or cmdType.value == 3.0:
            if cmdValue.ctype != 1:
                print('Row ',i+1,", Column 2 has wrong data")
                checkCmd = False
        # input type (cannot be empty)
        if cmdType.value == 4.0:
            if cmdValue.ctype == 0:
                print('Row ',i+1,", Column 2 has wrong data")
                checkCmd = False
        # wait type (must be number)
        if cmdType.value == 5.0:
            if cmdValue.ctype != 2:
                print('Row ',i+1,", Column 2 has wrong data")
                checkCmd = False
        # scroll (must be number)
        if cmdType.value == 6.0:
            if cmdValue.ctype != 2:
                print('Row ',i+1,", Column 2 has wrong data")
                checkCmd = False
        i += 1
    return checkCmd


def mainWork(img):
    i = 1
    while i < sheet1.nrows:
        # take in the current operation
        cmdType = sheet1.row(i)[0]
        if cmdType.value == 1.0:
            # take in the icon
            img = sheet1.row(i)[1].value
            retry = 1
            if sheet1.row(i)[2].ctype == 2 and sheet1.row(i)[2].value != 0:
                retry = sheet1.row(i)[2].value
            mouseClick(1,"left",img,retry)
            print("Left Click",img)
        elif cmdType.value == 2.0:
            img = sheet1.row(i)[1].value
            retry = 1
            if sheet1.row(i)[2].ctype == 2 and sheet1.row(i)[2].value != 0:
                retry = sheet1.row(i)[2].value
            mouseClick(2,"left",img,retry)
            print("Left Double-Click",img)
        elif cmdType.value == 3.0:
            img = sheet1.row(i)[1].value
            retry = 1
            if sheet1.row(i)[2].ctype == 2 and sheet1.row(i)[2].value != 0:
                retry = sheet1.row(i)[2].value
            mouseClick(1,"right",img,retry)
            print("Right Click",img) 
        elif cmdType.value == 4.0:
            inputValue = sheet1.row(i)[1].value
            pyperclip.copy(inputValue)
            pyautogui.hotkey('ctrl','v')
            time.sleep(0.5)
            print("Input:",inputValue)                                        
        elif cmdType.value == 5.0:
            waitTime = sheet1.row(i)[1].value
            time.sleep(waitTime)
            print("Wait ",waitTime," seconds")
        elif cmdType.value == 6.0:
            scroll = sheet1.row(i)[1].value
            pyautogui.scroll(int(scroll))
            print("Scroll ",int(scroll))                      
        i += 1


if __name__ == '__main__':
    file = 'cmd.xlsx'
    wb = xlrd.open_workbook(filename=file)

    sheet1 = wb.sheet_by_index(0)

    checkCmd = dataCheck(sheet1)
    if checkCmd:
        key = input('Select function: 1. Do it once; 2. Loop\n')
        if key == '1':
            mainWork(sheet1)
        elif key == '2':
            while True:
                mainWork(sheet1)
                time.sleep(0.1)
                print("Wait 0.1 seconds")    
    else:
        print('Input Error or Exited')
