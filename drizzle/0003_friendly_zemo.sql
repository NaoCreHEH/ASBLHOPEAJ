CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`organization` varchar(255) NOT NULL,
	`role` varchar(255),
	`content` text NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`email` varchar(320),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
