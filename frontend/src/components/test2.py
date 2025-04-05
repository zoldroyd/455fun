
import csv

csv_path = "/Users/Zac/Desktop/users_interactions.csv"
column_name = "contentId"

values = []

with open(csv_path, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if column_name in row and row[column_name].strip():
            values.append(int(row[column_name].strip()))

# Write to a TS file
with open("contentIds.ts", "w") as f:
    f.write("export const contentIds = " + str(values) + ";\n")

