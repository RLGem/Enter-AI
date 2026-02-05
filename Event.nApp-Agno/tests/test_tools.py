"""
Tests for Event.nApp-Agno Tools
"""
import pytest
from unittest.mock import MagicMock, patch


class TestEventTools:
    """Test event tools."""

    @patch("src.tools.event_tools.get_client")
    def test_create_event(self, mock_client):
        """Test creating an event."""
        from src.tools.event_tools import create_event

        # Mock database response
        mock_db = MagicMock()
        mock_client.return_value = mock_db
        mock_db.table.return_value.insert.return_value.execute.return_value.data = [
            {"id": "test-uuid", "name": "Test Wedding"}
        ]
        mock_db.table.return_value.select.return_value.eq.return_value.execute.return_value.data = []

        result = create_event(
            name="Test Wedding",
            event_type="wedding",
            event_date="1.6.2026",
            context={"user_id": "user-123"},
        )

        assert result["success"] is True
        assert "event_id" in result


class TestTaskTools:
    """Test task tools with duplicate prevention."""

    @patch("src.tools.task_tools.get_client")
    def test_create_task_prevents_duplicates(self, mock_client):
        """Test that creating a duplicate task is prevented."""
        from src.tools.task_tools import create_task

        # Mock database with existing task
        mock_db = MagicMock()
        mock_client.return_value = mock_db
        mock_db.table.return_value.select.return_value.eq.return_value.eq.return_value.ilike.return_value.execute.return_value.data = [
            {"id": "existing-task", "title": "Book photographer", "status": "open"}
        ]

        result = create_task(
            title="Book photographer",
            context={"event_id": "event-123"},
        )

        assert result["success"] is True
        assert result.get("already_exists") is True
        assert result["task_id"] == "existing-task"

    @patch("src.tools.task_tools.get_client")
    def test_create_new_task(self, mock_client):
        """Test creating a new task."""
        from src.tools.task_tools import create_task

        # Mock database with no existing task
        mock_db = MagicMock()
        mock_client.return_value = mock_db
        mock_db.table.return_value.select.return_value.eq.return_value.eq.return_value.ilike.return_value.execute.return_value.data = []
        mock_db.table.return_value.insert.return_value.execute.return_value.data = [
            {"id": "new-task", "title": "Book DJ"}
        ]

        result = create_task(
            title="Book DJ",
            context={"event_id": "event-123"},
        )

        assert result["success"] is True
        assert result.get("already_exists") is None
        assert result["task_id"] == "new-task"


class TestMemberTools:
    """Test member tools."""

    @patch("src.tools.member_tools.get_client")
    def test_add_member(self, mock_client):
        """Test adding a member."""
        from src.tools.member_tools import add_member

        mock_db = MagicMock()
        mock_client.return_value = mock_db
        mock_db.table.return_value.select.return_value.eq.return_value.ilike.return_value.execute.return_value.data = []
        mock_db.table.return_value.insert.return_value.execute.return_value.data = [
            {"id": "member-123", "name": "Danny", "role": "Father of groom"}
        ]

        result = add_member(
            name="Danny",
            role="Father of groom",
            side="groom",
            context={"event_id": "event-123"},
        )

        assert result["success"] is True
        assert result["name"] == "Danny"


class TestGuestTools:
    """Test guest tools."""

    @patch("src.tools.guest_tools.get_client")
    def test_add_guest(self, mock_client):
        """Test adding a guest."""
        from src.tools.guest_tools import add_guest

        mock_db = MagicMock()
        mock_client.return_value = mock_db
        mock_db.table.return_value.select.return_value.eq.return_value.ilike.return_value.execute.return_value.data = []
        mock_db.table.return_value.insert.return_value.execute.return_value.data = [
            {"id": "guest-123", "name": "Uncle David"}
        ]

        result = add_guest(
            name="Uncle David",
            side="groom",
            rsvp_status="confirmed",
            context={"event_id": "event-123"},
        )

        assert result["success"] is True


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
