exports.up = async (sql) => {
	await sql `
INSERT INTO products
 (name, price, description)
VALUES
 ('Cat Bread Shirt','10','Bread and kitty? What else do you really need in life? Check this design out in several various colors!'),
  ('Show me your kitty shirt','15','Hey! Want to show off your furbabies? Here is a way to bring attention to them and maybe something more...this shirt is purrfect for cat moms and lovers around the world.'),
 ('Adorable Meow Sweatshirt','20','This cute and comfortable sweatshirt is a must-have for cat lovers. Check out our sizing below, our customers generally like the fit one size larger.'),
 ('Black Cat Two Tone Sweatshirt','15','We just LOVE this yellow and blue two-tone sweatshirt, featuring a black cat graphic to the front. Be the coolest cat lover out there and get one for you and a friend.'),
 ('Cat Kisses Fish T-Shirt','15','Super cute women tee with cat print. Cute t-shirt of cat and a fish surface kissing! Cute theme with constant emission of good vibes for every cat lover!'),
 ('Peeking Cat Shirt','20','This peeking cat shirt shows off the cute black cat taking a look and seeing what they can find! Its made with cotton and fits true to size.'),
 ('Cat Pouch Grey Hoodie','13','Trying to find the purrfect way to catflix and chill with your favorite feline? Well, look no further! Nothing brings together humans and their kitties like the Cat Pouch Hoodie.'),
 ('Cat Face Jeans','12','Check out these awesome high-waisted stonewashed cat face jeans! The ultimate in vintage hipster wear, these will be the envy of everyone.');

	`;

};

exports.down = async (sql) => {
	await sql`
	DROP TABLE products`;
};
