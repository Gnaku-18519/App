fun note() {
    //var can be changed later, val is more like final
    //data type can be specified as var x:Int = 2 (but not necessarily needed when it's directly initialized)
    var temp: Int? = null //type is undefined
    println(temp)

    temp = 1 //if y is never changed, there will be a warning suggesting to change from var to val
    println("The value of temp is $temp")
    temp = 2
    println("The value of temp is now $temp")

    val wholeNumber = 2
    val bigNumber = 2L //long - 2^64
    val preciseDecimal = 2.22
    val decimal = 2.22f
    val iLoveVegetables = false
    val iLoveMeat = true
    val iLovePizza:Boolean

    iLovePizza = iLoveMeat && iLoveVegetables
    var zz = if (iLovePizza) 2 else 1

    //safe (?), non-null asserted (!!)
    val userInput = readLine() ?: "0" //if the input is null, it will assign 0 instead
    val parsedNumber = try {
        userInput.toInt()
    } catch (e: Exception) {
        0
    }
    println(parsedNumber)

    val shoppingList1 = listOf<String>("Ferrari", "Red Bull", "Mercedes") //listOf is an array
    val shoppingList2 = mutableListOf<String>("Ferrari", "Red Bull", "Mercedes") //mutableListOf is a list
    shoppingList2.add("McLaren")
    var counter = 0
    while (counter < shoppingList2.size) {
        println(shoppingList2[counter])
        counter++
    }

    for (i in 1..10) { //i in 1..10
        print(i)
    }
    println()

    val x = 4
    when (x) {
        in 1..2 -> println("x is between 1 and 2")
        in 3..10 -> println("x is between 3 and 10")
        else -> println("x is larger than 10")
    }
}