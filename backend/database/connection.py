import mysql.connector
from mysql.connector import Error


class Database:

    def __init__(
        self,
        host,
        user,
        password,
        database
    ):

        try:

            self.conn = mysql.connector.connect(
                host=host,
                user=user,
                password=password,
                database=database
            )

            self.cursor = self.conn.cursor(
                dictionary=True
            )

        except Error as e:

            print(
                "Erro ao conectar:",
                e
            )

            self.conn = None
            self.cursor = None

    def query(
        self,
        sql,
        params=None
    ):

        try:

            self.cursor.execute(
                sql,
                params or ()
            )

            return self.cursor.fetchall()

        except Error as e:

            print(e)

            return []

    def execute(
        self,
        sql,
        params=None
    ):

        try:

            self.cursor.execute(
                sql,
                params or ()
            )

            self.conn.commit()

            return self.cursor.lastrowid

        except Error as e:

            print(e)

            return None

    def close(self):

        if self.cursor:
            self.cursor.close()

        if self.conn:
            self.conn.close()