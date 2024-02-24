# Backdoor server access

General backdoor access for my projects:

* [Good roots](https://github.com/FelixRiddle/good-roots)

Real state app

* [Express authentication](https://github.com/FelixRiddle/express-authentication)

Authentication app, also used as a library

# Implementation

Implementation steps

## Implementation Idea 2

1) User can ask for key here
2) User sends it to the other backends
3) Backend asks this server if the key is correct
4) This server answers
5) Depending on the result access is granted

## Implementation Idea 1

1) User asks for backend access by providing a key.
2) Those apps compare user given key with the one provided by this app.
3) If keys match access is granted.
