#Method 1: this method is perfect for lists with different length
import csv
from itertools import zip_longest
list1 = ['a', 'b', 'c', 'd', 'e']
list2 = ['f', 'g', 'i', 'j']
d = [list1, list2]
export_data = zip_longest(*d, fillvalue = '')
with open('numbers.csv', 'w', encoding="ISO-8859-1", newline='') as myfile:
      wr = csv.writer(myfile)
      wr.writerow(("List1", "List2"))
      wr.writerows(export_data)
myfile.close()
"""
Output looks like:
List1   List2
a       f
b       g
c       i
d       j
e
"""

#Method 2: this method is perfect for lists with the same length
import csv
rows = zip(list1,list2,list3,list4,list5)
with open(newfilePath, "w") as f:
    writer = csv.writer(f)
    for row in rows:
        writer.writerow(row)

#Appendix -- zip
l = [('Result_1', 'Result_2', 'Result_3', 'Result_4'), (1, 2, 3, 4), (5, 6, 7, 8)]
zip(*l)
#we will get: [('Result_1', 1, 5), ('Result_2', 2, 6), ('Result_3', 3, 7), ('Result_4', 4, 8)]
