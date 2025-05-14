import psycopg2

connection = psycopg2.connect(
    user="postgres",
    password="admin",
    host="localhost",
    port="5432",
    database="humanitarian_data"
)

cursor = connection.cursor()

# Example query
cursor.execute("SELECT * FROM your_table;")
records = cursor.fetchall()

print(records)

cursor.close()
connection.close()
