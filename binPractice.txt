#!/bin/bash

#1.ask for a name with read. store it and echo it
read -p "please enter your name: " name
echo "hello $name"

#2.verificar si un numero es par o impar
read  -p "please enter your age: " age
if (( $age % 2  == 0));then
	echo "the age is even"
else
	echo "the age is odd"
fi

#3. Mostar mayor entre dos numeros
read -p "please enter first number" num1
read -p "please enter second number" num2

if ((num1 > num2));then
	echo "$num1 is bigger"
elif ((num2 > num1));then
	echo "$num2 is bigger"
else
	echo "the numbers are equal"
fi

#4.show numbers from 1 to 10
for i in $(seq 1 10);
do
	echo $i
done

#5. menu con case

