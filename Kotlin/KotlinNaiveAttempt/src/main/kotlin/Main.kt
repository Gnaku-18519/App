fun main() {
    val x = isEven(4)
    println(x)
    val y = 2
    println(y.isOdd())
    println()

    val list = listOf<String>("I", "have", "many", "things", "to", "say")
    val countOver3 = list.count { currentString ->
        currentString.length > 3
    }
    println("$countOver3 string(s) over length 3")
    val countOver4 = list.customCount { currentString ->
        currentString.length > 4
    }
    println("$countOver4 string(s) over length 4")
    println()

    val bunny = Bunny("Bunny")
    val zhu = GrayBunny()
    val dog = Dog()
    dog.bark()
    dog.play()
    val cat = Cat()
    cat.meow()
    cat.play()

    //(temporary) anonymous class - not accessible outside main()
    val bear = object : Animal("Bear") {
        override fun play() {
            println("I can play with snow")
        }
    }
    bear.play()
}

fun isEven(number: Int = 2): Boolean {
    //default number -- when the user doesn't assign any value when calling, the function will use the default value
    return (number % 2 == 0)
}

fun Int.isOdd(): Boolean { //like a function in a constructor
    return (this % 2 == 1)
}

fun <T> List<T>.customCount(function: (T) -> Boolean): Int {
    var count = 0
    for (item in this) {
        if (function(item)) {
            count++
        }
    }
    return count
}