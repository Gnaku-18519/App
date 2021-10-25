#use for single line comment
"""use for block comments"""

"""String: both ways are fine"""
a = "Hello World"
b = 'hello world'

"""list"""
c = ["Hello", "World"] # c[1] = 'World'
c + [1, 2, 3] # c = ["Hello", "World", 1, 2, 3]

X = [0,5,0,0,3,1,15,0,12]
X = [i for i in X if i != 0] #delete elements that are 0

"""dictionary (like an associated array): here "word" is the name of the dictionary, and can be used to call the element"""
d = {"word" : "Hello World"} # d["word"] = 'hello world'

"""set: no order, no repetition -> repeated elements will be automatically ignored"""
e = {1, 2, 3, 4, 4, 4, 4} # e = {1, 2, 3, 4}

"""Condition Sentence"""
if 1 == 1:
  print("Of Course")
if True or False:
  print("This is True")
if True and False:
  print("This is False")
  
"""Loop"""
for item in c:
  print(item)
for i in range(0,10):
  print(i)

x = 10
while x > 0:
  print(x)
  x -= 1
  
"""Exception"""
try:
  print(c[2])
except IndexError:
  print("Item not in the list")
  
"""Function: directly use func()"""
def func():
  print("Hello World")

"""Object"""
class Person:
  def __init__(self):
    print("New Person")
p = Person()

class Name(Person):
  def __init__(self):
    super().__init__() #call the special __init__ function
    print("My name is AJWuu")
n = Name()

"""Module: same as import in Java and #include in C"""
import math
print(math.pi)
