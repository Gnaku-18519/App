open class Bunny (
    //class needs to be open to get inherited
    val name: String,
    val action: String = "like"
) {
    init {
        println("I $action $name")
    }
}