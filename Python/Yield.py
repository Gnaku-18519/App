my_list = [x for x in range(1,10)]

#with generator
def process_list_with_generator(my_list):
    for i in range(len(my_list)):
        yield my_list[i] * 2
"""
1. generator ("yield") makes the code look tidier
2. return each element instead of a whole list,
   so after returning an element, the computer can automatically free that space without storing it,
   and this is more memory efficient
"""

#without generator
def process_list(my_list):
    for i in range(len(my_list)):
        my_list[i] *= 2
    return my_list

for item in my_list:
    print(item, end = ' ')
print('')

for item in process_list_with_generator(my_list): #loop1
    print(item, end = ' ')
print('')

for item in process_list(my_list): #loop2
    print(item, end = ' ')
print('')

"""
If we do loop1 before loop2, we get:
    1 2 3 4 5 6 7 8 9
    2 4 6 8 10 12 14 16 18
    2 4 6 8 10 12 14 16 18
If we do loop2 before loop1, we get:
    1 2 3 4 5 6 7 8 9
    2 4 6 8 10 12 14 16 18
    4 8 12 16 20 24 28 32 36
This also implies that loop2 updates my_list
"""
