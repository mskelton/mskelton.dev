CREATE TABLE `bytes` (
	`content` blob NOT NULL,
	`created_at` integer NOT NULL,
	`description` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `bytes_to_tags` (
	`byte_id` text NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`byte_id`, `tag_id`),
	FOREIGN KEY (`byte_id`) REFERENCES `bytes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`created_at` integer NOT NULL,
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bytes_slug_unique` ON `bytes` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `tags_name_unique` ON `tags` (`name`);