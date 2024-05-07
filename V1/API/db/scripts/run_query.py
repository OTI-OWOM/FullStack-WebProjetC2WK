import sys
import sqlite3

def main():
    user_id = sys.argv[1]
    with open('deleteUser.sql', 'r') as file:
        sql = file.read()

    sql = sql.format(user_id=user_id)

    # Assuming you are using SQLite as your database
    conn = sqlite3.connect('your_database.db')
    cursor = conn.cursor()
    cursor.execute(sql)
    rows = cursor.fetchall()

    for row in rows:
        print(row)

    conn.close()

if __name__ == "__main__":
    main()
