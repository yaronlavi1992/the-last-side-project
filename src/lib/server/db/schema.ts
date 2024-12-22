import { pgTable, serial, text, integer, uuid } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	age: integer('age')
});

export const profileTable = pgTable('profile', {
	id: uuid('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
})