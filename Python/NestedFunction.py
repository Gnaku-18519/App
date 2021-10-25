def outer_func(who):
    def inner_func():
        print(f"Hello, {who}")
    inner_func()

outer_func("World!")

"""
Pass a string as an argument to outer_func(), 
and inner_func() will access that argument through the name who.
This name, however, is defined in the local scope of outer_func().
The names that defined in the local scope of an outer function are known as nonlocal names.
They are nonlocal from the inner_func() point of view.
"""
