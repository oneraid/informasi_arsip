<!-- resources/views/create-word.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Word Document</title>
</head>
<body>
    <h1>Create Word Document</h1>

    <form action="{{ route('create.word') }}" method="POST">
        @csrf
        <label for="content">Enter Content:</label>
        <textarea id="content" name="content" rows="4" cols="50"></textarea>
        <br>
        <button type="submit">Create Document</button>
    </form>
</body>
</html>
