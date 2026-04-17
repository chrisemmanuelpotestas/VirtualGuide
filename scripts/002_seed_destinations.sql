-- Seed Philippine destinations data
INSERT INTO destinations (name, region, province, description, long_description, image_url, gallery_urls, category, rating, review_count, latitude, longitude, best_time_to_visit, average_budget_per_day, highlights, activities, travel_tips, accessibility_info) VALUES

-- Beaches
('Boracay Island', 'Western Visayas', 'Aklan', 
'World-famous island known for its pristine white sand beaches and vibrant nightlife.',
'Boracay is a small island in the Philippines located approximately 315 km south of Manila and 2 km off the northwest tip of Panay Island. It has a total land area of 10.32 km², with a width of 1 km at its narrowest point. The island comprises three villages: Balabag, Manoc-Manoc, and Yapak. White Beach, the main tourist beach, stretches for about 4 km along the western coast.',
'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
ARRAY['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
'beach', 4.7, 2847, 11.9674, 121.9248, 'November to May (dry season)',
3500,
ARRAY['White Beach', 'Puka Shell Beach', 'Ariels Point', 'D''Mall Shopping Area', 'Willy''s Rock'],
ARRAY['Swimming', 'Island hopping', 'Snorkeling', 'Scuba diving', 'Parasailing', 'Sunset sailing', 'Beach parties'],
ARRAY['Book accommodation in advance during peak season', 'Bring reef-safe sunscreen', 'Respect the environmental rules', 'Try local Filipino dishes at D''Mall'],
'Accessible via Caticlan Airport or Kalibo International Airport, then boat transfer'),

('El Nido, Palawan', 'MIMAROPA', 'Palawan',
'Gateway to the Bacuit Archipelago, featuring stunning limestone cliffs and crystal-clear lagoons.',
'El Nido is a first-class municipality in the province of Palawan, Philippines. It is known for its white-sand beaches, coral reefs, and as the gateway to the Bacuit archipelago. The archipelago has limestone cliffs, lagoons, coves, and white-sand beaches. The area is characterized by dramatic karst limestone formations, pristine beaches, and vibrant marine ecosystems.',
'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1200',
ARRAY['https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800', 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=800'],
'beach', 4.9, 3156, 11.1784, 119.3930, 'December to May',
4000,
ARRAY['Big Lagoon', 'Small Lagoon', 'Secret Lagoon', 'Seven Commandos Beach', 'Nacpan Beach', 'Shimizu Island'],
ARRAY['Island hopping tours', 'Kayaking', 'Snorkeling', 'Diving', 'Beach camping', 'Cliff jumping', 'Sunset watching'],
ARRAY['Book island hopping tours in advance', 'Bring waterproof bags', 'Environmental fee required', 'Cash is preferred in remote areas'],
'Accessible via El Nido Airport or 5-6 hour drive from Puerto Princesa'),

('Siargao Island', 'Caraga', 'Surigao del Norte',
'The surfing capital of the Philippines, known for the famous Cloud 9 wave.',
'Siargao is a tear-drop shaped island in the Philippine Sea situated 196 kilometers southeast of Tacloban. It is known as the "Surfing Capital of the Philippines" due to the presence of Cloud 9, one of the best waves in Asia. Beyond surfing, Siargao offers pristine lagoons, caves, rock pools, and a laid-back island vibe that attracts travelers seeking authentic tropical experiences.',
'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800'],
'beach', 4.8, 1923, 9.8482, 126.0458, 'September to November (surfing), March to October (general)',
2800,
ARRAY['Cloud 9 Surfing Spot', 'Sugba Lagoon', 'Magpupungko Rock Pools', 'Naked Island', 'Daku Island', 'Guyam Island'],
ARRAY['Surfing', 'Island hopping', 'Paddleboarding', 'Cliff diving', 'Motorbike touring', 'Beach bumming'],
ARRAY['Rent a motorbike for exploration', 'Surfing lessons available for beginners', 'Try coconut dishes', 'Respect local surfer etiquette'],
'Accessible via Sayak Airport with flights from Cebu and Manila'),

('Coron, Palawan', 'MIMAROPA', 'Palawan',
'Famous for WWII shipwreck diving and stunning inland lakes surrounded by limestone cliffs.',
'Coron is a municipality in the province of Palawan. The Calamian Islands, particularly Coron Island, are famous for their WWII-era Japanese shipwrecks, now sunken dive sites. The area also features stunning lakes like Kayangan Lake (often called the cleanest lake in the Philippines) and Twin Lagoon, surrounded by dramatic limestone karst landscapes.',
'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200',
ARRAY['https://images.unsplash.com/photo-1573790387438-4da905039392?w=800', 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800'],
'beach', 4.8, 2341, 11.9986, 120.2043, 'November to May',
3800,
ARRAY['Kayangan Lake', 'Twin Lagoon', 'Barracuda Lake', 'Skeleton Wreck', 'CYC Beach', 'Malcapuya Island'],
ARRAY['Wreck diving', 'Snorkeling', 'Island hopping', 'Lake swimming', 'Hot springs visit', 'Sunset cruise'],
ARRAY['Get diving certification beforehand for wreck dives', 'Bring underwater camera', 'Book tours through reputable operators', 'Try Coron''s seafood'],
'Accessible via Busuanga Airport'),

('Bantayan Island', 'Central Visayas', 'Cebu',
'Serene island escape with powdery white sand beaches and stunning sunsets.',
'Bantayan Island is a small island located at the Visayan Sea in the Philippines. It is known for its white sand beaches, serene atmosphere, and spectacular sunsets. Unlike more touristy destinations, Bantayan offers a more laid-back experience with its fishing villages, mangrove forests, and authentic Filipino island life.',
'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200',
ARRAY['https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800'],
'beach', 4.5, 876, 11.1833, 123.7333, 'December to May',
2000,
ARRAY['Sugar Beach', 'Paradise Beach', 'Ogtong Cave', 'Kota Beach', 'Virgin Island'],
ARRAY['Beach relaxation', 'Sunset watching', 'Snorkeling', 'Island hopping', 'Cycling', 'Cave swimming'],
ARRAY['Try the local dried fish and seafood', 'Rent a bicycle to explore', 'Visit during Holy Week for unique traditions', 'Cash is essential'],
'Accessible via ferry from Hagnaya Port, Cebu'),

-- Mountains
('Banaue Rice Terraces', 'Cordillera Administrative Region', 'Ifugao',
'UNESCO World Heritage Site featuring 2,000-year-old rice terraces carved into the mountains.',
'The Banaue Rice Terraces are 2,000-year-old terraces that were carved into the mountains of Ifugao in the Philippines by ancestors of the indigenous people. The terraces are occasionally called the "Eighth Wonder of the World" and are commonly thought to be over 2,000 years old. They are located approximately 1,500 meters above sea level and cover 10,360 square kilometers of mountainside.',
'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200',
ARRAY['https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800', 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800'],
'cultural', 4.8, 1567, 16.9167, 121.0500, 'March to May (planting season) and June to July (green terraces)',
2500,
ARRAY['Batad Rice Terraces', 'Bangaan Village', 'Tam-an Village', 'Banaue Museum', 'Tappiya Falls'],
ARRAY['Trekking', 'Photography', 'Cultural immersion', 'Village visits', 'Waterfall hikes', 'Rice terrace tours'],
ARRAY['Hire a local guide for treks', 'Respect local customs and traditions', 'Bring sturdy hiking shoes', 'Learn about Ifugao culture before visiting'],
'Accessible via 9-hour bus ride from Manila or van from Baguio'),

('Mount Pulag', 'Cordillera Administrative Region', 'Benguet',
'The highest peak in Luzon, famous for its sea of clouds and dwarf bamboo grasslands.',
'Mount Pulag is the highest mountain in Luzon and the third highest mountain in the Philippines with an elevation of 2,922 meters above sea level. It is famous for its sea of clouds, which can be observed at the summit during sunrise. The mountain features diverse ecosystems including mossy forests and grasslands dominated by dwarf bamboo.',
'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200',
ARRAY['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800'],
'mountain', 4.9, 2103, 16.5889, 120.8958, 'November to February (best for sea of clouds)',
1500,
ARRAY['Summit Peak', 'Sea of Clouds', 'Ambangeg Trail', 'Akiki Trail', 'Mossy Forest'],
ARRAY['Mountain climbing', 'Camping', 'Stargazing', 'Sunrise viewing', 'Photography', 'Bird watching'],
ARRAY['Register at DENR office', 'Bring warm clothes (near freezing at summit)', 'Acclimatize properly', 'Leave no trace principles'],
'Accessible via Ambangeg, Kabayan from Baguio City'),

('Mount Apo', 'Davao Region', 'Davao del Sur',
'The highest peak in the Philippines, a challenging climb through diverse ecosystems.',
'Mount Apo is the highest mountain in the Philippine archipelago, with an elevation of 2,954 meters. It is located on the island of Mindanao between the provinces of Davao del Sur and North Cotabato. The mountain is considered a sacred place by the indigenous Bagobo people and features diverse flora and fauna including the endangered Philippine Eagle.',
'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200',
ARRAY['https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800'],
'mountain', 4.7, 1432, 7.0000, 125.2708, 'March to May (dry season)',
2000,
ARRAY['Summit Peak', 'Lake Venado', 'Boulder Face', 'Sulfur Vents', 'Old Growth Forest'],
ARRAY['Mountain climbing', 'Camping', 'Nature photography', 'Bird watching', 'Hot springs'],
ARRAY['Get permits from DENR and LGU', 'Physical fitness required', 'Hire accredited guides', 'Bring adequate supplies for multi-day trek'],
'Accessible via Kidapawan City or Digos City'),

('Chocolate Hills', 'Central Visayas', 'Bohol',
'Unique geological formation of over 1,200 cone-shaped hills that turn brown in dry season.',
'The Chocolate Hills are a geological formation in the Bohol province of the Philippines. There are at least 1,260 hills but there may be as many as 1,776 hills spread over an area of more than 50 square kilometers. They are covered in green grass that turns brown during the dry season, hence the name.',
'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=1200',
ARRAY['https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=800'],
'nature', 4.6, 1876, 9.7500, 124.0167, 'February to May (when hills turn chocolate brown)',
1800,
ARRAY['Chocolate Hills Viewing Deck', 'ATV Adventure Park', 'Sagbayan Peak', 'Man-Made Forest', 'Tarsier Sanctuary'],
ARRAY['Sightseeing', 'ATV riding', 'Ziplining', 'Photography', 'Nature walks', 'Tarsier viewing'],
ARRAY['Visit early morning for best photos', 'Combine with other Bohol attractions', 'Dry season for brown hills', 'Respect tarsier viewing guidelines'],
'Accessible via Tagbilaran City, 1.5 hours by car'),

-- Cultural & Historical
('Intramuros, Manila', 'NCR', 'Manila',
'Historic walled city built during Spanish colonial era, the heart of old Manila.',
'Intramuros is the oldest district and historic core of Manila, the capital of the Philippines. It was the seat of government when the Philippines was a component realm of the Spanish Empire. The district is sometimes called the Walled City because it is surrounded by thick walls and moats. Intramuros contains centuries-old churches, plazas, and Spanish colonial architecture.',
'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1200',
ARRAY['https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800'],
'historical', 4.4, 2341, 14.5896, 120.9750, 'November to February (cooler months)',
1500,
ARRAY['Fort Santiago', 'Manila Cathedral', 'San Agustin Church', 'Casa Manila', 'Baluarte de San Diego', 'Plaza San Luis'],
ARRAY['Walking tours', 'Museum visits', 'Historical photography', 'Bamboo bike tours', 'Cultural performances', 'Food trips'],
ARRAY['Start early to avoid heat', 'Hire a guide for historical context', 'Try halo-halo at Ilustrado', 'Comfortable walking shoes essential'],
'Located in central Manila, accessible by taxi, jeepney, or LRT'),

('Vigan City', 'Ilocos Region', 'Ilocos Sur',
'UNESCO World Heritage city preserving Spanish colonial architecture and Filipino heritage.',
'Vigan is a city on the western coast of Luzon island in the Philippines. It is a UNESCO World Heritage Site and one of the few Hispanic towns left in the Philippines, establishing it as a major tourist destination. Calle Crisologo, the main street, features cobblestones and colonial-era architecture that transport visitors back in time.',
'https://images.unsplash.com/photo-1598538367405-22bc0e93f569?w=1200',
ARRAY['https://images.unsplash.com/photo-1598538367405-22bc0e93f569?w=800'],
'historical', 4.7, 1654, 17.5747, 120.3869, 'November to February (cool, dry weather)',
2200,
ARRAY['Calle Crisologo', 'Bantay Bell Tower', 'Crisologo Museum', 'Hidden Garden', 'Baluarte Zoo', 'Plaza Salcedo'],
ARRAY['Kalesa (horse carriage) rides', 'Heritage walking tours', 'Pottery making', 'Weaving demonstrations', 'Food trips', 'Night market visits'],
ARRAY['Try Vigan longganisa and empanada', 'Walk Calle Crisologo at night', 'Visit during festivals for cultural shows', 'Buy abel Iloko souvenirs'],
'Accessible via 8-hour bus ride from Manila or via Laoag Airport'),

('Cebu City', 'Central Visayas', 'Cebu',
'The Queen City of the South, rich in history as the cradle of Christianity in the Philippines.',
'Cebu City is a major city in the Philippines, the capital of Cebu province, and the center of Metro Cebu. It is known as the oldest city in the Philippines, established on February 24, 1565. Cebu is famous for being the birthplace of Christianity in the Far East and houses the Basilica del Santo Niño and Magellan''s Cross.',
'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200',
ARRAY['https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=800'],
'urban', 4.5, 1987, 10.3157, 123.8854, 'Year-round, best January for Sinulog Festival',
2500,
ARRAY['Magellan''s Cross', 'Basilica del Santo Niño', 'Fort San Pedro', 'Taoist Temple', 'Tops Lookout', 'Carbon Market'],
ARRAY['Historical tours', 'Food trips', 'Shopping', 'Temple visits', 'City photography', 'Nightlife'],
ARRAY['Visit during Sinulog for festive atmosphere', 'Try lechon Cebu', 'Explore beyond tourist spots', 'Use Grab for transportation'],
'Accessible via Mactan-Cebu International Airport'),

-- Nature & Adventure
('Puerto Princesa Underground River', 'MIMAROPA', 'Palawan',
'UNESCO World Heritage Site and one of the New 7 Wonders of Nature.',
'The Puerto Princesa Subterranean River National Park is a protected area of the Philippines located about 80 kilometers north of the city center of Puerto Princesa. The river extends 8.2 kilometers and features a limestone karst landscape with caves. It was inscribed in the UNESCO World Heritage List in 1999 and selected as one of the New Seven Wonders of Nature in 2012.',
'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
'nature', 4.8, 2567, 10.1667, 118.9167, 'December to May',
3000,
ARRAY['Underground River Boat Tour', 'Sabang Beach', 'Mangrove Paddle Tour', 'Zip Line', 'Ugong Rock Adventures'],
ARRAY['Cave boat tours', 'Beach swimming', 'Kayaking', 'Ziplining', 'Spelunking', 'Mangrove tours'],
ARRAY['Book permits in advance (limited daily capacity)', 'Bring flashlight', 'Wear comfortable clothes', 'Visit Honda Bay for island hopping'],
'Accessible 2 hours from Puerto Princesa city proper'),

('Tubbataha Reefs Natural Park', 'MIMAROPA', 'Palawan',
'Premier diving destination and UNESCO World Heritage marine sanctuary.',
'Tubbataha Reefs Natural Park is a protected area of the Philippines covering 97,030 hectares. It is located in the middle of the Sulu Sea. The reef is home to over 600 fish species, 360 coral species, 11 shark species, 13 dolphin and whale species, and many bird species. It is considered one of the best diving destinations in the world.',
'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200',
ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
'nature', 4.9, 567, 8.9500, 119.8333, 'Mid-March to Mid-June (only diving season)',
15000,
ARRAY['North Atoll', 'South Atoll', 'Shark Airport', 'Amos Rock', 'Bird Islet'],
ARRAY['Scuba diving', 'Snorkeling', 'Wildlife watching', 'Underwater photography', 'Liveaboard cruises'],
ARRAY['Book liveaboard months in advance', 'Advanced diving certification required for some sites', 'Conservation fee required', 'No land visits allowed'],
'Accessible only via liveaboard from Puerto Princesa (10-12 hours)'),

('Kawasan Falls', 'Central Visayas', 'Cebu',
'Stunning multi-tiered turquoise waterfalls in a lush forest setting.',
'Kawasan Falls is a three-tiered waterfall located in Badian, Cebu. The falls are fed by springs in the Mantalongon mountain range and are known for their cool, turquoise-blue water. The largest waterfall is about 40 meters high and is surrounded by lush vegetation, making it a popular destination for canyoneering adventures.',
'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200',
ARRAY['https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800'],
'adventure', 4.7, 1876, 9.8167, 123.3833, 'Year-round (avoid typhoon season)',
2500,
ARRAY['First Level Falls', 'Second Level Falls', 'Third Level Falls', 'Canyoneering Route', 'Bamboo Rafting'],
ARRAY['Canyoneering', 'Swimming', 'Cliff jumping', 'Bamboo rafting', 'Photography', 'Nature trekking'],
ARRAY['Book canyoneering tour for full experience', 'Bring waterproof gear', 'Wear water shoes', 'Start early to avoid crowds'],
'Accessible 3 hours from Cebu City'),

('Apo Island', 'Central Visayas', 'Negros Oriental',
'World-renowned marine sanctuary famous for swimming with sea turtles.',
'Apo Island is a volcanic island covering 12 hectares located in the Visayan Sea. It is part of the town of Dauin in Negros Oriental. The island is known as one of the best diving spots in the Philippines, with a marine sanctuary that is home to hundreds of species of corals and fish, and is famous for frequent sea turtle sightings.',
'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1200',
ARRAY['https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800'],
'adventure', 4.8, 1234, 9.0667, 123.2667, 'November to May',
2800,
ARRAY['Marine Sanctuary', 'Turtle Viewing Area', 'Chapel on the Hill', 'Rock Point', 'Coconut Point'],
ARRAY['Snorkeling with turtles', 'Scuba diving', 'Island trekking', 'Beach camping', 'Underwater photography'],
ARRAY['Don''t touch the turtles', 'Bring reef-safe sunscreen', 'Respect marine sanctuary rules', 'Stay overnight for best experience'],
'Accessible via boat from Malatapay, Zamboanguita');

-- Insert accommodations for featured destinations
INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url) 
SELECT d.id, 'Discovery Shores Boracay', 'resort', 12000, 4.8, ARRAY['Beach access', 'Pool', 'Spa', 'Restaurant', 'WiFi', 'AC'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'
FROM destinations d WHERE d.name = 'Boracay Island';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url) 
SELECT d.id, 'Frangipani El Nido', 'hotel', 5500, 4.5, ARRAY['Restaurant', 'WiFi', 'AC', 'Tour assistance', 'Airport transfer'], 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600'
FROM destinations d WHERE d.name = 'El Nido, Palawan';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url) 
SELECT d.id, 'Kermit Surf Resort', 'resort', 3500, 4.6, ARRAY['Surf lessons', 'Restaurant', 'WiFi', 'Board rental', 'Pool'], 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600'
FROM destinations d WHERE d.name = 'Siargao Island';

-- Insert transportation options
INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila', 'flight', 3500, 1, 'Multiple daily flights', 'Fly to Kalibo or Caticlan Airport'
FROM destinations d WHERE d.name = 'Boracay Island';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila', 'flight', 5000, 1.5, 'Daily flights', 'Direct flights to El Nido Lio Airport'
FROM destinations d WHERE d.name = 'El Nido, Palawan';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Cebu', 'flight', 2500, 1, 'Daily flights', 'Fly to Sayak Airport'
FROM destinations d WHERE d.name = 'Siargao Island';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila', 'bus', 500, 9, 'Multiple daily departures', 'Overnight bus recommended'
FROM destinations d WHERE d.name = 'Banaue Rice Terraces';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila', 'bus', 800, 8, 'Multiple daily departures', 'Partas or Dominion Bus Lines'
FROM destinations d WHERE d.name = 'Vigan City';
