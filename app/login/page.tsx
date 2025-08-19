// ... imports

export default function LoginPage() {
  // ... hooks and functions

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          {/* CHANGED THIS LINE */}
          <CardTitle className="text-center">FEU-ECL Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn} className="w-full">
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
