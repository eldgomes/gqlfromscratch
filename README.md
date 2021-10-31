authentication:
if not logged in, shouldnt perform any write operations

even if UI doesnt allow it, you could still call mutation from playground
need to protect against this

express-jwt is an authentication option