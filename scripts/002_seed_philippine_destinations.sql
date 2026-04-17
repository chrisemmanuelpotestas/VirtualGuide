-- Seed data for Philippine tourist destinations

-- Insert destinations
INSERT INTO destinations (name, region, province, description, long_description, image_url, category, rating, review_count, latitude, longitude, best_time_to_visit, average_budget_per_day, highlights, activities, travel_tips) VALUES

-- Beach destinations
('Boracay Island', 'Western Visayas', 'Aklan', 'World-famous white sand beach paradise known for its powdery sand and vibrant nightlife.', 'Boracay is a small island in the Philippines located approximately 315 km south of Manila. The island comprises the barangays of Manoc-Manoc, Balabag, and Yapak in the municipality of Malay, in Aklan Province. It is famous for its white sand beaches, crystal-clear waters, and vibrant nightlife. The island underwent a six-month rehabilitation in 2018, resulting in cleaner waters and improved infrastructure.', 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800', 'beach', 4.7, 2847, 11.9674, 121.9248, 'November to May (dry season)', 3500.00, ARRAY['White Beach', 'Puka Shell Beach', 'Crystal Cove Island', 'Mount Luho', 'Diniwid Beach'], ARRAY['Island hopping', 'Snorkeling', 'Scuba diving', 'Parasailing', 'Sunset sailing', 'Cliff diving at Ariel Point'], ARRAY['Book accommodations in advance during peak season', 'Bring reef-safe sunscreen', 'Try the local seafood at D''Talipapa market']),

('El Nido', 'MIMAROPA', 'Palawan', 'Stunning limestone cliffs, hidden lagoons, and pristine beaches in the heart of Palawan.', 'El Nido is a Philippine municipality on Palawan island. It is known for white-sand beaches, coral reefs and as the gateway to the Bacuit archipelago, a group of islands with steep karst cliffs. The area features hidden beaches, lagoons, and coves accessible only by boat. El Nido is consistently ranked as one of the best island destinations in the world.', 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800', 'beach', 4.8, 3156, 11.1784, 119.3930, 'December to May', 4000.00, ARRAY['Big Lagoon', 'Small Lagoon', 'Secret Lagoon', 'Seven Commandos Beach', 'Nacpan Beach'], ARRAY['Island hopping tours A, B, C, D', 'Kayaking', 'Snorkeling', 'Cliff jumping', 'Beach bumming', 'Sunset watching at Las Cabanas'], ARRAY['Book island tours in advance', 'Bring waterproof bags for electronics', 'Environmental fee required']),

('Siargao Island', 'Caraga', 'Surigao del Norte', 'The surfing capital of the Philippines with the famous Cloud 9 wave and laid-back island vibes.', 'Siargao is a tear-drop shaped island in the Philippine Sea. It is known as the Surfing Capital of the Philippines due to its waves particularly the Cloud 9 which has achieved legendary status worldwide. Beyond surfing, the island offers pristine beaches, coconut forests, clear lagoons, and a bohemian atmosphere that attracts backpackers and adventurers alike.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', 'beach', 4.6, 1923, 9.8482, 126.0458, 'March to October (surf season)', 2500.00, ARRAY['Cloud 9 Surfing', 'Sugba Lagoon', 'Magpupungko Rock Pools', 'Naked Island', 'Daku Island'], ARRAY['Surfing', 'Island hopping', 'Lagoon swimming', 'Motorbiking', 'Cliff jumping', 'Mangrove paddleboarding'], ARRAY['Rent a motorbike to explore the island', 'Best waves are from August to November', 'Respect the local surf culture']),

('Coron', 'MIMAROPA', 'Palawan', 'Famous for WWII shipwreck diving and stunning freshwater lakes surrounded by limestone cliffs.', 'Coron is a municipality of Palawan province, covering part of Busuanga Island, all of Coron Island, and various minor islets. It is known for its World War II wreck diving sites and the stunning Kayangan Lake, often called the cleanest lake in the Philippines. The area features unique geological formations, hot springs, and diverse marine life.', 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800', 'beach', 4.7, 2134, 11.9986, 120.2043, 'November to May', 3800.00, ARRAY['Kayangan Lake', 'Twin Lagoon', 'Barracuda Lake', 'Skeleton Wreck', 'Malcapuya Island'], ARRAY['Wreck diving', 'Snorkeling', 'Island hopping', 'Lake swimming', 'Hot springs bathing'], ARRAY['Get diving certification before visiting', 'Kayangan Lake has an entrance fee', 'Best to book tours through your hotel']),

-- Mountain destinations
('Banaue Rice Terraces', 'Cordillera Administrative Region', 'Ifugao', '2000-year-old hand-carved rice terraces often called the Eighth Wonder of the World.', 'The Banaue Rice Terraces are terraces that were carved into the mountains of Ifugao by ancestors of the indigenous people. The terraces are occasionally called the "Eighth Wonder of the World" and are a UNESCO World Heritage Site. They are located approximately 1500 meters above sea level and cover 10,360 square kilometers of mountainside.', 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800', 'mountain', 4.5, 1567, 16.9167, 121.0500, 'February to June (planting/harvest season)', 2000.00, ARRAY['Batad Rice Terraces', 'Bangaan Village', 'Tam-an Village', 'Tappiya Falls', 'Native Village Museum'], ARRAY['Rice terrace trekking', 'Cultural immersion', 'Waterfall hiking', 'Photography', 'Village homestays'], ARRAY['Hire a local guide for trekking', 'Bring warm clothing as it gets cold', 'Respect Ifugao traditions and customs']),

('Mount Pulag', 'Cordillera Administrative Region', 'Benguet', 'The third highest mountain in the Philippines famous for its spectacular sea of clouds sunrise.', 'Mount Pulag is the third-highest mountain in the Philippines and the highest peak in Luzon. It is famous for its sea of clouds, which can be observed at sunrise. The mountain is home to dwarf bamboo grasslands and mossy forests, and is a popular destination for trekkers seeking the magnificent sunrise view above the clouds.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', 'mountain', 4.8, 2089, 16.5874, 120.8930, 'November to February (sea of clouds season)', 1800.00, ARRAY['Sea of Clouds', 'Grassland Summit', 'Mossy Forest', 'Eddet River', 'Kabayan Mummy Caves'], ARRAY['Summit hiking', 'Camping', 'Stargazing', 'Wildlife spotting', 'Photography'], ARRAY['Register with DENR before climbing', 'Bring warm layers for near-freezing temperatures', 'Start trek before midnight for sunrise']),

-- Cultural destinations
('Vigan City', 'Ilocos Region', 'Ilocos Sur', 'UNESCO World Heritage Spanish colonial town with cobblestone streets and heritage architecture.', 'Vigan is a UNESCO World Heritage Site and the capital city of Ilocos Sur. It is the best-preserved example of a planned Spanish colonial town in Asia. The city features Calle Crisologo, a street lined with ancestral houses, and is known for its unique blend of Philippine and European architecture.', 'https://images.unsplash.com/photo-1598431429388-7a1db8c3cb19?w=800', 'cultural', 4.6, 1834, 17.5747, 120.3869, 'Year-round, festivals in January', 2200.00, ARRAY['Calle Crisologo', 'St. Paul Cathedral', 'Bantay Bell Tower', 'Crisologo Museum', 'Plaza Salcedo Dancing Fountain'], ARRAY['Calesa ride', 'Heritage walking tour', 'Pottery making', 'Weaving demonstration', 'Food trip'], ARRAY['Visit during Vigan Longganisa Festival in January', 'Try the famous empanada and bagnet', 'Best to walk the heritage streets']),

('Intramuros, Manila', 'National Capital Region', 'Metro Manila', 'The historic walled city of Manila showcasing Spanish colonial history and architecture.', 'Intramuros is the oldest district and historic core of Manila. The Walled City was the seat of the Spanish colonial government and was once Manila''s premier residential and commercial area. Today, it houses several important landmarks including Fort Santiago, Manila Cathedral, and San Agustin Church.', 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800', 'historical', 4.4, 2567, 14.5890, 120.9751, 'Year-round', 1500.00, ARRAY['Fort Santiago', 'Manila Cathedral', 'San Agustin Church', 'Casa Manila', 'Baluarte de San Diego'], ARRAY['Walking tour', 'Bamboo bike tour', 'Museum visits', 'Historical photography', 'Food crawl'], ARRAY['Best visited early morning or late afternoon', 'Join a guided walking tour for best experience', 'Try halo-halo at the local cafes']),

-- Nature destinations
('Puerto Princesa Underground River', 'MIMAROPA', 'Palawan', 'UNESCO World Heritage Site featuring one of the world''s longest navigable underground rivers.', 'The Puerto Princesa Subterranean River National Park is a UNESCO World Heritage Site and was voted as one of the New 7 Wonders of Nature. The park features a spectacular limestone karst landscape with an underground river that is navigable by boat for 4.3 kilometers.', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800', 'nature', 4.7, 2345, 10.1673, 118.9188, 'Year-round, best December to May', 3000.00, ARRAY['Underground River Tour', 'Sabang Beach', 'Mangrove Paddle Tour', 'Zipline', 'Ugong Rock Adventures'], ARRAY['Underground river boat tour', 'Kayaking', 'Ziplining', 'Caving', 'Nature trekking'], ARRAY['Book permits in advance as daily visitors are limited', 'Bring insect repellent', 'Wear comfortable shoes for the short trek']),

('Chocolate Hills', 'Central Visayas', 'Bohol', 'Over 1,200 perfectly cone-shaped hills that turn brown during dry season, resembling chocolate kisses.', 'The Chocolate Hills are a geological formation in Bohol. There are at least 1,260 hills spread over an area of more than 50 square kilometers. They are covered in green grass that turns brown during the dry season, hence the name. The hills are a famous tourist attraction and are featured in the provincial flag and seal.', 'https://images.unsplash.com/photo-1551524164-a5b5e1f1b3a3?w=800', 'nature', 4.5, 1876, 9.7961, 124.1014, 'February to June (chocolate brown color)', 2500.00, ARRAY['Chocolate Hills Complex', 'Sagbayan Peak', 'Tarsier Sanctuary', 'Loboc River', 'Panglao Beaches'], ARRAY['Viewpoint sightseeing', 'ATV adventure', 'Tarsier watching', 'River cruise', 'Beach hopping'], ARRAY['Best viewed early morning or late afternoon', 'Combine with Panglao beach trip', 'Don''t touch or use flash on tarsiers']),

-- Adventure destinations
('Kawasan Falls', 'Central Visayas', 'Cebu', 'Multi-tiered turquoise waterfalls perfect for canyoneering adventures and swimming.', 'Kawasan Falls is a three-tiered waterfall located in Badian, Cebu. It is famous for its turquoise blue waters and is the endpoint of the popular canyoneering adventure that starts from the neighboring municipality of Alegria. The falls is one of the most visited natural attractions in Cebu.', 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800', 'adventure', 4.6, 1654, 9.8097, 123.3825, 'Year-round, best January to May', 2800.00, ARRAY['Kawasan Falls', 'Canyoneering Trail', 'Badian Island', 'Osmena Peak', 'Mantayupan Falls'], ARRAY['Canyoneering', 'Cliff jumping', 'Waterfall swimming', 'Bamboo rafting', 'Trekking'], ARRAY['Book canyoneering with a licensed operator', 'Bring waterproof camera', 'Wear aqua shoes for the adventure']),

('Apo Island', 'Central Visayas', 'Negros Oriental', 'World-renowned marine sanctuary with incredible diving and sea turtle encounters.', 'Apo Island is a volcanic island and a popular tourist destination located in Dauin, Negros Oriental. It is renowned for its marine biodiversity and is a marine sanctuary. The island is famous for its sea turtle population and is considered one of the best diving spots in the Philippines.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', 'adventure', 4.7, 1432, 9.0736, 123.2678, 'Year-round, best March to June', 3200.00, ARRAY['Marine Sanctuary', 'Turtle Watching', 'Rock Point', 'Chapel Point', 'Coconut Point'], ARRAY['Scuba diving', 'Snorkeling with turtles', 'Freediving', 'Island trekking', 'Cliff jumping'], ARRAY['Respect marine life - don''t touch turtles', 'Marine sanctuary fee required', 'Best diving visibility March to June']),

-- Urban destinations
('Makati City', 'National Capital Region', 'Metro Manila', 'The financial capital of the Philippines with world-class shopping, dining, and nightlife.', 'Makati is the financial center of the Philippines and one of the major commercial, financial, and entertainment hubs in Metro Manila. It is home to the Ayala Center, the country''s premier shopping and lifestyle destination, as well as numerous skyscrapers, museums, and cultural landmarks.', 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=800', 'urban', 4.3, 1234, 14.5547, 121.0244, 'Year-round', 4500.00, ARRAY['Ayala Center', 'Greenbelt', 'Poblacion', 'Ayala Museum', 'Legazpi Sunday Market'], ARRAY['Shopping', 'Fine dining', 'Nightlife', 'Museum visits', 'Food trips'], ARRAY['Traffic is heavy - use MRT or walk', 'Poblacion has the best nightlife', 'Try local restaurants in Legazpi Village']),

('Cebu City', 'Central Visayas', 'Cebu', 'The Queen City of the South blending rich history with modern urban development.', 'Cebu City is the oldest city in the Philippines and the capital of Cebu province. It is the second most significant metropolitan center in the nation after Metro Manila. The city blends its rich cultural heritage with modern urban development, offering historical sites, shopping centers, and delicious local cuisine.', 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800', 'urban', 4.4, 1567, 10.3157, 123.8854, 'Year-round, festivals in January', 3000.00, ARRAY['Magellan''s Cross', 'Basilica del Santo Nino', 'Fort San Pedro', 'Taoist Temple', 'Carbon Market'], ARRAY['Historical tour', 'Food trip', 'Shopping', 'Temple visit', 'Market exploration'], ARRAY['Visit during Sinulog Festival in January', 'Try lechon from CNT or Zubuchon', 'Use Grab for convenient transportation']);

-- Insert accommodations
INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url) 
SELECT d.id, 'Discovery Shores Boracay', 'resort', 15000.00, 4.8, ARRAY['Beachfront', 'Pool', 'Spa', 'Restaurant', 'WiFi'], 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'
FROM destinations d WHERE d.name = 'Boracay Island';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url)
SELECT d.id, 'Frendz Resort Boracay', 'hostel', 800.00, 4.2, ARRAY['Shared rooms', 'Common area', 'WiFi', 'Tours desk'], 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'
FROM destinations d WHERE d.name = 'Boracay Island';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url)
SELECT d.id, 'El Nido Resorts Miniloc Island', 'resort', 25000.00, 4.9, ARRAY['Private island', 'All-inclusive', 'Diving', 'Kayaks', 'Restaurant'], 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'
FROM destinations d WHERE d.name = 'El Nido';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url)
SELECT d.id, 'Spin Designer Hostel', 'hostel', 600.00, 4.3, ARRAY['Dorm beds', 'Rooftop bar', 'WiFi', 'Breakfast'], 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'
FROM destinations d WHERE d.name = 'El Nido';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url)
SELECT d.id, 'Siargao Bleu Resort', 'resort', 8000.00, 4.6, ARRAY['Pool', 'Restaurant', 'Surf lessons', 'WiFi'], 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400'
FROM destinations d WHERE d.name = 'Siargao Island';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url)
SELECT d.id, 'Paglaom Hostel', 'hostel', 500.00, 4.4, ARRAY['Surfboard storage', 'Common area', 'WiFi', 'Kitchen'], 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400'
FROM destinations d WHERE d.name = 'Siargao Island';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url)
SELECT d.id, 'Two Seasons Coron', 'resort', 18000.00, 4.7, ARRAY['Private beach', 'Diving center', 'Spa', 'Restaurant'], 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'
FROM destinations d WHERE d.name = 'Coron';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url)
SELECT d.id, 'Banaue Hotel', 'hotel', 2500.00, 4.0, ARRAY['Mountain view', 'Restaurant', 'WiFi', 'Tour desk'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
FROM destinations d WHERE d.name = 'Banaue Rice Terraces';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url)
SELECT d.id, 'Native Village Inn', 'homestay', 1200.00, 4.3, ARRAY['Authentic experience', 'Home-cooked meals', 'Cultural immersion'], 'https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=400'
FROM destinations d WHERE d.name = 'Banaue Rice Terraces';

INSERT INTO accommodations (destination_id, name, type, price_per_night, rating, amenities, image_url)
SELECT d.id, 'Hotel Felicidad Vigan', 'hotel', 3500.00, 4.4, ARRAY['Heritage building', 'Pool', 'Restaurant', 'WiFi'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
FROM destinations d WHERE d.name = 'Vigan City';

-- Insert transportation options
INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila (NAIA)', 'flight', 3500.00, 1.0, 'Multiple daily flights', 'Fly to Kalibo or Caticlan airport'
FROM destinations d WHERE d.name = 'Boracay Island';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Caticlan Jetty Port', 'ferry', 100.00, 0.25, 'Every 15 minutes', 'Short boat ride to Boracay'
FROM destinations d WHERE d.name = 'Boracay Island';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila (NAIA)', 'flight', 4500.00, 1.25, 'Multiple daily flights', 'Fly to El Nido (Lio) or Puerto Princesa'
FROM destinations d WHERE d.name = 'El Nido';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Puerto Princesa', 'van', 600.00, 5.5, 'Multiple daily trips', 'Van shuttle to El Nido town'
FROM destinations d WHERE d.name = 'El Nido';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila (NAIA)', 'flight', 5000.00, 2.0, 'Daily flights', 'Fly to Siargao (Sayak) Airport'
FROM destinations d WHERE d.name = 'Siargao Island';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Cebu', 'flight', 3000.00, 1.0, 'Daily flights', 'Fly from Cebu to Siargao'
FROM destinations d WHERE d.name = 'Siargao Island';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila (NAIA)', 'flight', 4000.00, 1.0, 'Multiple daily flights', 'Fly to Busuanga Airport'
FROM destinations d WHERE d.name = 'Coron';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila', 'bus', 700.00, 9.0, 'Multiple daily trips', 'Overnight bus to Banaue via Ohayami Trans'
FROM destinations d WHERE d.name = 'Banaue Rice Terraces';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Baguio', 'van', 400.00, 5.0, 'Morning departures', 'Van to Banaue via Bontoc'
FROM destinations d WHERE d.name = 'Banaue Rice Terraces';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila', 'bus', 600.00, 8.0, 'Multiple daily trips', 'Bus to Vigan via Partas or Dominion'
FROM destinations d WHERE d.name = 'Vigan City';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila (NAIA)', 'flight', 3000.00, 1.25, 'Multiple daily flights', 'Fly to Puerto Princesa Airport'
FROM destinations d WHERE d.name = 'Puerto Princesa Underground River';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila (NAIA)', 'flight', 2500.00, 1.25, 'Multiple daily flights', 'Fly to Tagbilaran Airport'
FROM destinations d WHERE d.name = 'Chocolate Hills';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Manila (NAIA)', 'flight', 2000.00, 1.25, 'Multiple daily flights', 'Fly to Mactan-Cebu Airport'
FROM destinations d WHERE d.name = 'Kawasan Falls';

INSERT INTO transportation (destination_id, from_location, type, estimated_cost, duration_hours, frequency, notes)
SELECT d.id, 'Cebu City', 'bus', 200.00, 3.0, 'Hourly departures', 'Bus to Badian, Cebu (South Bus Terminal)'
FROM destinations d WHERE d.name = 'Kawasan Falls';
