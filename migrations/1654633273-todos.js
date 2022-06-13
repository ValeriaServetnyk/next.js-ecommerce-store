exports.up = async (sql) => {
  await sql`
	CREATE TABLE products (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name varchar(50) NOT NULL,
  price varchar(30) NOT NULL,
	description varchar(600) NOT NULL
)`;
}

exports.down = async (sql) => {
	await sql`
	DROP TABLE products`;
};
