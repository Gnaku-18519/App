import csv
import pandas as pd
with open("file_address") as csv_file:
    column_names = ["A", "B", "C"]
    df = pd.read_csv("csv_file", header=0, names=column_names)
    A = df.A.to_list()
    B = df.B.to_list()
    C = df.C.to_list()
    
"""
file_address:
    1. use double backslashes -> open("C:\\Program Files")
    2. add "r" as a remark of raw address -> open(r'C:\Program Files')
    BTW, "C:\Program Files" == "C:\PROGRA~1" and "C:\Program Files (x86)" == "C:\PROGRA~2"

pandas.read_csv:
    header=None -> pandas automatically assign the first row of df (which is the actual column names) to the first row, hence your columns no longer have names.
    header=0 -> pandas first deletes column names(header) and then assign new column names to them (only if you pass names = [........] while loading your file).
"""
