// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RoomBooking {
    struct Room {
        string name;
        uint256 price; // Price in wei
        address owner;
        bool isBooked;
    }

    // Mapping lưu trữ các phòng với roomId là chuỗi
    mapping(string => Room) public rooms;

    event RoomAdded(string roomId, string name, uint256 price, address owner);
    event RoomBooked(string roomId, address booker);

    // Thêm phòng mới
    function addRoom(string memory _roomId, string memory _name, uint256 _price) public {
        require(_price > 0, "Price must be greater than 0");
        
        rooms[_roomId] = Room({
            name: _name,
            price: _price,
            owner: msg.sender,
            isBooked: false
        });

        emit RoomAdded(_roomId, _name, _price, msg.sender);
    }

    // Book phòng
    function bookRoom(string memory _roomId) public payable {
        Room storage room = rooms[_roomId];

        // require(room.price > 0, "Room does not exist");
        // require(!room.isBooked, "Room is already booked");
        // require(msg.value >= room.price, "Insufficient payment");

        // room.isBooked = true;
        payable(room.owner).transfer(msg.value);

        emit RoomBooked(_roomId, msg.sender);
    }

    // Lấy thông tin phòng
    function getRoomInfo(string memory _roomId) public view returns (string memory, uint256, bool) {
        Room storage room = rooms[_roomId];
        return (room.name, room.price, room.isBooked);
    }
}
