"""
To deal with conditional functions, we can:
Method 1. add conditions in the function
Method 2. add a decorator without changing the function itself
"""

#Method 1
def div(a, b):
    if b == 0:
        return "Denominator is 0"
    else:
        return a / b
print(div(10, 0))


#Method 2
#nested function allowed
def check(func):
    def inside(a, b):
        if b == 0:
            return "Cannot divide by 0"
        func(a, b) #pass into func()
    return inside #execute inside()

#usage1
def div_dec(a, b):
    return a / b
div_dec = check(div_dec)
print(div_dec(10, 0))

#usage2
@check
def div_dec_at(a, b):
    return a / b
print(div_dec_at(10, 0))
