#Declare a matrix
A = [[0 for x in range(M)] for y in range(N)] #NxM matrix

#Sum
numpy.sum(A, axis=0)  #"axis=0" says "get the sum along the columns"
numpy.sum(A, axis=1)  #"axis=1” says "get the sum along the rows"

#Calculate
numpy.add(X, Y) -> X + Y
numpy.subtract(X, Y) -> X - Y
numpy.multiply([b; d; e], [B, D, E]) -> [b; d; e] * [B, D, E] = [B*b; D*d; E*e]
numpy.matmul([b; d; e], [B, D, E]) == [b; d; e] * [B, D, E] -> [b; d; e] * [B, D, E] = B*b + D*d + E*e
numpy.divide(X, Y) -> X / Y (Y is a number)
