abstract class Animal (
    //abstract class cannot be created directly
    //abstract is automatically open
    val name: String,
) {
    init {
        println("Hello, this is $name")
    }

    abstract fun play()
}