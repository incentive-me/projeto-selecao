package main

import "log"

func main(){
	store, err := NewPostgresStore()

	if err != nil {
		log.Fatal(err)
	}

	if err := store.Init(); err != nil {
		log.Fatal(err)
	}

	server := NewAPIServer(":8080", store)
	server.Run()

	println("Yeah Buddy!")
}