class Dog : Animal("Dog") { //inheritance
    fun bark() {
        println("Woong!")
    }

    override fun play() {
        println("I can run around the garden")
    }
}