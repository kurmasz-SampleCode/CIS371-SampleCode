# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Color.create(title: 'Ocean at noon', color: 0x029eb6, rating: 5, uuid: '0175d1f0-a8c6-41bf-8d02-df5734d829a4')
Color.create(uuid: "83c7ba2f-7392-4d7d-9e23-35adbe186046",title: "Lawn",color:0x2534486, rating:3)
Color.create(uuid: "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",title: "Bright red",color: 0x16711680,rating:2)
Color.create(uuid: "49fef18c-475c-4ff7-b2de-7adfdbcbaa24",title: "Orange",color:0xca8102,rating: 0)